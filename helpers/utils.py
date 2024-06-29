from re import match

def validate_email(email):
    """ returns true if email is valid otherwise false"""
    pattern = r"^[a-z0-9_.]+@[a-z]+\.[a-z]+$"    
    return bool(match(pattern, email))

