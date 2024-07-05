import smtplib
from os import environ




class Email:
    MAIL_SERVER = environ.get('MAIL_SERVER')
    MAIL_PORT = environ.get('MAIL_PORT')

    MAIL_USERNAME = environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = environ.get('MAIL_PASSWORD')

    def __init__(self) -> None:
        self.server = smtplib.SMTP(self.MAIL_SERVER, self.MAIL_PORT)
        self.server.starttls()

        self.server.login(self.MAIL_USERNAME, self.MAIL_PASSWORD)


    def sendMail(self, from_, reciever, message):
        subject = 'Metafora Ticket Received'
        body = f"Subject: {subject}\n\n{message}"
        
        self.server.sendmail(from_, to_addrs=reciever, msg=body)
        print(f"email sent to {reciever} successfully")
