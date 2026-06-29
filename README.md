# VaidyaOS

VaidyaOS is an AI-powered multilingual clinical intake platform for Indian healthcare. The backend now provides a production-ready foundation for authentication, patient registration, consultation intake, and speech processing workflows.

## Backend

- FastAPI application with modular routers
- JWT authentication with role-based access
- Patient and consultation management
- Speech processing endpoint for audio upload and transcript generation
- Structured summary generation for doctor review

## Run locally

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Test

```bash
cd backend
python -m pytest -q
```

## Notes

The current implementation uses local, deterministic services for the clinical workflow so it runs without external AI dependencies. The architecture is ready for future integration with Ollama, Whisper, and ChromaDB.
