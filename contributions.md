guidelines för att implementera features i vårt projekt:

om du vill lägga till features skriv till Tobbe först och dubbelkolla så att ingen annan ska göra samma sak.

    Webbplatsen skall ha två vyer: desktop och mobile. Design-ändringar bör ha mobile-first upplägg i åtanke.

Vid ändring i befintliga filer:

    Använd ej Prettier (eller liknande) kodformaterare, de gör det besvärligt att se vad som faktiskt har ändrats.
    Om en ny funktion läggs till, skriv en kort kommentar över den vad den gör.
    Om en större/utbrytbar feature läggs till, överväg att lägga den i separata js/css-filer istället och länka in.
    Använd 4 mellanslags indrag (4 spaces indentation). Använd block-formatering enligt:

Vid skapande av nya filer:

    Nya CSS-filer skall ligga i css-mappen.
    Nya javascript-filer skapas som moduler i modules-mappen och importeras in i script_main.js (eller befintlig modul vid behov).
    inga nya html filer
