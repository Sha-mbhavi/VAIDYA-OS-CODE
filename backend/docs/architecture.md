# VaidyaOS Architecture

## Layers

- API: route handlers for auth, patients, consultations, speech, and summary
- Services: domain logic for authentication, consultation intake, interview generation, speech processing, and summaries
- Models: SQLAlchemy entities for users, patients, consultations, doctors, and SOAP notes
- Schemas: Pydantic request and response contracts
- Core: database, security, and configuration modules

## Workflow

1. Receptionist or doctor registers/authenticates.
2. Patient profile is created.
3. A consultation is opened for the patient.
4. Audio is uploaded and processed into a transcript.
5. Summary and risk guidance are generated for doctor review.
