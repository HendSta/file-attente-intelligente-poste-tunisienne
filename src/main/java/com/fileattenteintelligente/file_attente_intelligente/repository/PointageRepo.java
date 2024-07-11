package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Pointage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PointageRepo extends MongoRepository<Pointage, String> {
    Pointage findByCinEmployeAndDateDebut(long cinEmploye, String dateDebut);
    List<Pointage> findByCinEmploye(long cinEmploye);



}
