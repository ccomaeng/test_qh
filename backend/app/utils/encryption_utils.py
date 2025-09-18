"""
암호화 유틸리티 모듈
"""
import os
from cryptography.fernet import Fernet

class EncryptionManager:
    """암호화 관리 클래스"""

    def __init__(self):
        # 환경변수에서 암호화 키 가져오기
        encryption_key = os.getenv('ENCRYPTION_KEY', 'DUE84JvcMn4XA2jxKyYD_ayTxRY6gQUk_nDN15-8dXw=')
        self.fernet = Fernet(encryption_key.encode())

    def decrypt_file(self, encrypted_file_path: str) -> str:
        """암호화된 파일을 복호화하여 텍스트로 반환"""
        try:
            with open(encrypted_file_path, 'rb') as encrypted_file:
                encrypted_data = encrypted_file.read()

            # 복호화
            decrypted_data = self.fernet.decrypt(encrypted_data)
            return decrypted_data.decode('utf-8')

        except Exception as e:
            print(f"Error decrypting file {encrypted_file_path}: {e}")
            return ""

    def decrypt_content(self, encrypted_content: bytes) -> str:
        """암호화된 내용을 복호화"""
        try:
            decrypted_data = self.fernet.decrypt(encrypted_content)
            return decrypted_data.decode('utf-8')
        except Exception as e:
            print(f"Error decrypting content: {e}")
            return ""

# 전역 인스턴스
encryption_manager = EncryptionManager()