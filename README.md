# Map markers
Link do apki: https://map-users-eed35.web.app/
### Front:
React + vite + tailwind <br/>
Hostowane na firebase
### Backend
Fastapi + mongoDB <br/>
Fastapi postawione w Dockerze na Google Cloud <br/>
MongoDB na mongoDB atlas


# Zadanie 1 - projektowe
Zadanie polega na stworzeniu web-aplikacji, która wyświetlać będzie mapę z naniesioną na nią lokalizacją wirtualnych użytkowników. Na mapie mają znajdować się punkty symbolizujące użytkowników, wraz z etykietami (imionami). W aplikacji powinien znaleźć się przycisk "Create user", którego kliknięcie spowoduje utworzenie użytkownika na podstawie danych zwracanych z https://randomuser.me/api/ (należy wykorzystać results[0].location.coordinates oraz results[0].name.first). Powinna też istnieć możliwość usuwania użytkowników. Użytkownik końcowy aplikacji nie powinien mieć technicznej możliwości dowiedzenia się z jakiego API korzysta aplikacja. Cała aplikacja powinna działać bez przeładowania, a jej stan (w tym nowo utworzeni użytkownicy) ma być niezmienny pomiędzy przeładowaniami strony nawet w różnych przeglądarkach.

Po realizacji:
Udostępnij kod poprzez link do repozytorium GIT.
Udostępnij link do działającej aplikacji.

Wskazówki:
Usługę do wyświetlania map wybierz samodzielnie.
Sposób hostowania aplikacji wybierz samodzielnie.
Do implementacji frontendu możesz wykorzystać czysty JavaScript lub skorzystać z wybranego przez siebie frameworka.
Backend może być napisany np. w Pythonie lub PHPie, razem z jakimś popularnym frameworkiem (Django, Bottle, Symfony).
