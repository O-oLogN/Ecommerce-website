package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.cart.RemoveItemFromCartRequest;
import com.ecom.dto.request.cart.UpdateItemInCartRequest;
import com.ecom.entities.Cart;
import com.ecom.entities.ItemCart;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.repository.CartRepository;
import com.ecom.repository.ItemCartRepository;
import com.ecom.repository.ItemRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.CartService;
import com.ecom.utils.ValidationUtils;
import jakarta.transaction.Transactional;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {
    private final ItemCartRepository itemCartRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    private final MessageHelper messageHelper;

    @Override
    public ResponseEntity<?> updateItem(UpdateItemInCartRequest updateItemInCartRequest) throws Exception {
        String username = updateItemInCartRequest.getUsername();
        String itemId = updateItemInCartRequest.getItemId();
        Integer itemQuantity = updateItemInCartRequest.getItemQuantity();

        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.update.item.error.validation.username")
            );
        }
        if (ValidationUtils.isNullOrEmpty(itemId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.update.item.error.validation.itemId")
            );
        }
        if (ValidationUtils.isNullOrEmpty(itemQuantity) || itemQuantity <= 0) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.update.item.error.validation.itemQuantity")
            );
        }

        String userId = userRepository.findUserByUsername(username).getUserId();
        Cart cart = cartRepository.findCartByUserId(userId);
        Set<ItemCart> itemCarts = cart.getItemCarts();
        ItemCart targetItemCart = itemCarts.stream()
                .filter(itemCart -> itemCart.getItem().getItemId().equals(itemId))
                .findFirst().orElse(null);
        if (targetItemCart == null) {           // New item to cart
            ItemCart newItemCart = ItemCart
                    .builder()
                    .itemCartId(UUID.randomUUID().toString())
                    .item(itemRepository.findItemByItemId(itemId))
                    .cart(cartRepository.findCartByUserId(userId))
                    .itemQuantity(1)
                    .createUser(CoreConstants.ROLE.ADMIN)
                    .createDatetime(LocalDateTime.now())
                    .build();
            itemCarts.add(newItemCart);
            cart.setItemCarts(itemCarts);
        }
        else {                                  // Item is already in cart
            targetItemCart.setItemQuantity(itemQuantity);
            targetItemCart.setModifyUser(CoreConstants.ROLE.ADMIN);
            targetItemCart.setModifyDatetime(LocalDateTime.now());

            itemCartRepository.save(targetItemCart);
        }
        return ResponseHelper.ok(
            sortItemsInCart(cart.getItemCarts()),
            HttpStatus.OK,
            messageHelper.getMessage("admin.cartController.update.item.info.success")
        );
    }

    @Override
    public ResponseEntity<?> removeItemFromCart(RemoveItemFromCartRequest removeItemFromCartRequest) throws Exception {
        String username = removeItemFromCartRequest.getUsername();
        String itemId = removeItemFromCartRequest.getItemId();

        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.remove.item.error.validation.username")
            );
        }
        if (ValidationUtils.isNullOrEmpty(itemId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.remove.item.error.validation.itemId")
            );
        }

        String userId = userRepository.findUserByUsername(username).getUserId();
        Cart cart = cartRepository.findCartByUserId(userId);
        Set<ItemCart> itemCarts = cart.getItemCarts();
        itemCarts.removeIf(itemCart -> itemCart.getItem().getItemId().equals(itemId));
        cart.setItemCarts(itemCarts);

        return ResponseHelper.ok(
            sortItemsInCart(cart.getItemCarts()),
            HttpStatus.OK,
            messageHelper.getMessage("admin.cartController.remove.item.info.success")
        );
    }

    @Override
    public ResponseEntity<?> getItems(String username) throws Exception {
        if (ValidationUtils.isNullOrEmpty(username)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.get.item.error.validation.username")
            );
        }

        String userId = userRepository.findUserByUsername(username).getUserId();
        Cart cart = cartRepository.findCartByUserId(userId  );
        return ResponseHelper.ok(
            sortItemsInCart(cart.getItemCarts()),
            HttpStatus.OK,
    ""
        );
    }

    @Override
    public void clearCart(String userId) throws Exception {
        if (ValidationUtils.isNullOrEmpty(userId)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.cartController.clear.cart.error.validation.userId")
            );
        }

        Cart cart = cartRepository.findCartByUserId(userId);
        cart.getItemCarts().clear();
        cartRepository.save(cart);

        ResponseHelper.ok(cart.getItemCarts(), HttpStatus.OK, "");
    }

    private List<ItemCart> sortItemsInCart(Set<ItemCart> unsortedItemsSet) {
        List<ItemCart> itemList = new ArrayList<>(unsortedItemsSet);
        itemList.sort(Comparator.comparing(ItemCart::getCreateDatetime));
        return itemList;
    }
}
