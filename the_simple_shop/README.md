# The Simple Shop

Funkcjonalna aplikacja e‑commerce zbudowana w oparciu o React, Vite oraz MUI.
Projekt korzysta z FakeStoreAPI jako źródła danych o produktach oraz z symulowanego backendu przy użyciu LocalStorage.

## Funkcjonalność bazowa

- Katalog produktów: przeglądanie produktów, wyszukiwanie po nazwie, filtrowanie po kategorii.
- Szczegóły produktu: pełny opis, dynamiczne routowanie, wybór ilości.
- Koszyk: dodawanie/usuwanie produktów, zmiana ilości, obliczanie sumy w czasie rzeczywistym.
- Autoryzacja:
- System logowania/rejestracji (mockowany).
- Utrzymywanie sesji (symulacja tokenu JWT).
- Role użytkowników: Administrator (admin@shop.com) oraz zwykły użytkownik.
- Historia zamówień: użytkownicy mogą przeglądać swoje wcześniejsze zamówienia.
- Recenzje: zalogowani użytkownicy mogą dodawać opinie i oceny produktów.
- UI/UX: kosmiczny design oparty na MUI.

## Narzędzia

- Frontend: React 19, Vite
- Zarządzanie stanem: Zustand
- Routing: React Router DOM v7
- Framework UI: Material UI v7
- HTTP Client: Axios
- Ikony: MUI Icons
