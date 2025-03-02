package com.ecom.repository;

import com.ecom.entities.VnpayTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VnpayTransactionRepository extends JpaRepository<VnpayTransaction, String> {
}
