#ArticlesClient:

Narzędzia:

nodejs v - 10.5.0

npm v - 6.1.0

Docker - Version 18.03.1-ce-win65 (17513) (build na linux)

-------------------------------------------------------------
#Uruchamianie projektu:


`npm install` - katalog z package.json instaluje node_module 


`ng serve` - odpala projekt na porcie 4200 w trybie developerskim

-------------------------------------------------------------
#Tworzenie instancji na dockerze:


Tworzymy dockerowy obraz - katalog z Dockerfile:
`docker build -t angularclient:prod .`

Uruchamiamy obraz:
`docker run -p <port_zewnętrzny>:80 <id obrazu>`
