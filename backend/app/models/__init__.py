from .user import User
from .patient import Patient
from .consultation import Consultation
from .doctor import Doctor
from .soap import SOAPNote
from .audio import AudioFile
from .medical_record import MedicalRecord
from .appointment import Appointment
from .voice_intake import VoiceIntake
from .file_upload import FileUpload

__all__ = [
    'User',
    'Patient',
    'Consultation',
    'Doctor',
    'SOAPNote',
    'AudioFile',
    'MedicalRecord',
    'Appointment',
    'VoiceIntake',
    'FileUpload',
]