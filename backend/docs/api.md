# VaidyaOS API Overview

## Authentication

- POST /auth/register
- POST /auth/login
- GET /auth/me

## Patients

- POST /patients
- GET /patients
- GET /patients/{patient_id}
- PUT /patients/{patient_id}
- DELETE /patients/{patient_id}

## Consultations

- POST /consultations
- GET /consultations
- GET /consultations/{consultation_id}
- PATCH /consultations/{consultation_id}

## Speech

- POST /speech/process

## Summary

- POST /summary
