import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClinicHistoryService from "../../../services/clinicHistory.service";
const PatientCreateNewClinicHistory = ({ patient }) => {
  const [clinicHistoriesSystem, setClinicHistoriesSytem] = useState([]);

  useEffect(() => {
    ClinicHistoryService.getAllClinicHistoryFormats().then((data) => {
      setClinicHistoriesSytem(data);
    });
  }, []);

  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Creación de una nueva historia clinica para el paciente{" "}
              {patient.personalInformation.firstName}{" "}
              {patient.personalInformation.lastName}{" "}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>Escoja uno de los modelos de historia clínica activos:</h5>
          {clinicHistoriesSystem.map((clinicHistory) => {
            if (clinicHistory.enabled) {
              return (
                <div>
                  <ul>
                    <li>
                      <Link
                        to={`/patients/patientNewClinicHistoryFormat/${patient.id}/${clinicHistory.id}`}
                      >
                        {clinicHistory.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            } else {
              return null;
            }
          })}
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientCreateNewClinicHistory;
