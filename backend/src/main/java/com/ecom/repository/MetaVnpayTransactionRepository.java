package com.ecom.repository;

import com.ecom.entities.MetaVnpayTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetaVnpayTransactionRepository extends JpaRepository<MetaVnpayTransaction, String> {
}
