import socket
from i_am_evanchen import app


def main():
    app.run(debug=True, host=socket.gethostname(), port=8000)


if __name__ == '__main__':
    main()
