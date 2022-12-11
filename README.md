# Recommendation Engine for Spotify

## Cel projektu 
Celem projektu jest stworzenie aplikacji internetowej, która rekomeduje użytkownikowi nowe piosenki na podstawie ostatnio słuchanych utworów, korzystając z API zapewnianego przez Spotify oraz serwisów chmurowych Azure.

## Opis działania
Po zalogowaniu użytkownik może wybrać listę, dla której będą generowane rekomendacje: historia słuchania lub ostatnie najczęściej słuchane utwory. Zapytanie o rekomendacje trafia do Azure Funkcji, która zaciąga z Bazy Danych odpowiednie dane i dopasowuje nowe piosenki do tych wybranych przez użytkownika. Lista rekomendacji zwrócona przez Funkcję zostaje wyświetlona w Aplikacji Webowej.

## Demo
https://user-images.githubusercontent.com/46073943/206925426-8be40784-f72f-447e-b463-9de90f1acdcd.mp4

## Wykorzystane usługi oraz technologie
* Azure App Service  
* Azure SQL Server  
* Azure Functions  
* React 
* Github Actions for CI/CD

## Architektura
![architecture](https://user-images.githubusercontent.com/46073943/206925579-95c00d1c-77e9-4ae0-bfa5-b0c225752c47.jpg)

## Ograniczenia 
Aplikacji niestety nie możemy udowtępnić publicznie. API Spotify w wersji deweloperskiej pozwala na korzystanie tylko użytkownikom wpisanym na whitelistę, a dla projektów uczelnianych nie zapewniają rozrzeń.
![quotaext](https://user-images.githubusercontent.com/46073943/206925526-bac72ab9-29c4-4758-9c89-6cc3c1799ea5.png)

## Skład zespołu
* [Michał Banaszczak](https://github.com/mihawb)
* [Daniel Stańkowski](https://github.com/Daniel-Stankowski)
* [Michał Tomczyk](https://github.com/KiczuPL)
