import pytest
from fastapi.testclient import TestClient

from app.core.database import Base, engine
from app.main import app


@pytest.fixture(autouse=True)
def clean_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)


def test_auth_patient_and_consultation_flow():
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Dr. Ananya Rao",
            "email": "ananya@example.com",
            "password": "SecurePass123!",
            "role": "doctor",
        },
    )
    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "ananya@example.com",
            "password": "SecurePass123!",
        },
    )
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    me_response = client.get("/auth/me", headers=headers)
    assert me_response.status_code == 200

    patient_response = client.post(
        "/patients",
        json={
            "full_name": "Ramesh Kumar",
            "age": 48,
            "gender": "male",
            "phone": "9876543210",
            "language": "Hindi",
            "address": "Bengaluru",
        },
        headers=headers,
    )
    assert patient_response.status_code == 201
    patient_id = patient_response.json()["id"]

    consultation_response = client.post(
        "/consultations",
        json={
            "patient_id": patient_id,
            "chief_complaint": "Fever and cough for 3 days",
            "notes": "Patient reports fatigue",
            "priority": "high",
        },
        headers=headers,
    )
    assert consultation_response.status_code == 201
    consultation_data = consultation_response.json()
    assert consultation_data["patient_id"] == patient_id
    assert consultation_data["status"] == "pending"


def test_public_patient_and_consultation_flow_without_auth():
    patient_response = client.post(
        "/patients",
        json={
            "full_name": "Ravi Sharma",
            "age": 41,
            "gender": "male",
            "phone": "9123456780",
            "language": "English",
            "address": "Mumbai",
        },
    )
    assert patient_response.status_code == 201

    consultation_response = client.post(
        "/consultations",
        json={
            "patient_id": patient_response.json()["id"],
            "chief_complaint": "Headache and dizziness",
            "notes": "Patient reports mild dehydration",
            "priority": "medium",
        },
    )
    assert consultation_response.status_code == 201


def test_audio_processing_endpoint_returns_transcript():
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Receptionist Maya",
            "email": "maya@example.com",
            "password": "SecurePass123!",
            "role": "receptionist",
        },
    )
    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "maya@example.com",
            "password": "SecurePass123!",
        },
    )
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post(
        "/speech/process",
        headers=headers,
        files={"file": ("sample.wav", b"fake audio bytes", "audio/wav")},
    )
    assert response.status_code == 200
    data = response.json()
    assert "transcript" in data
    assert data["language"] in {"Hindi", "English", "Bengali", "Tamil"}
