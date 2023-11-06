const form = document.getElementById("film-form")
const titleElement = document.querySelector("#title")
const directorElement = document.querySelector("#director")
const urlElement = document.querySelector("#url")
const cardBody = document.querySelectorAll(".card-body")[1]// filmlerin olduğu div elementi çağırılır
const clear = document.getElementById("clear-films")

// Tüm eventleri yükle
eventListeners()
function eventListeners() { // sayfa yüklendiğinde yapılacaklar bçlümü
    form.addEventListener("submit", addFilm)
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage()
        UI.loadAllFilms(films)
    })
    cardBody.addEventListener("click", deleteFilm) // filmlerin olduğu alana click eventi yerleştirilir
    clear.addEventListener("click", clearAllFilms)
}
function addFilm(e) {
    const title = titleElement.value
    const director = directorElement.value
    const url = urlElement.value

    if (title === "" || director === "" || url === "") {
        // boş alan giriş kontrolü
        UI.displayMessages("Tü alanları doldurun", "danger")
    } else {
        //Yeni film
        const newFilm = new Film(title, director, url)
        UI.addFilmToUI(newFilm)// Ara yüze film ekleme
        Storage.addFilmStorage(newFilm) // storageye film ekleme
        UI.displayMessages("film Başarı ile Eklendi", "success")
    }
    UI.clearInputs(titleElement, directorElement, urlElement)

    e.preventDefault()
}
function deleteFilm(e) { // seçili event burda tespit edilerek silinir   
    if (e.target.id === "delete-film") { // seçili eleman id si delete film ise istediğimiz yere basmış ve silme işlemi için içeri gir
        UI.deleteFilmFromUI(e.target) // seçili elementi deleteFilmFromUI fonksiyonuna gönderir
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        UI.displayMessages("Silme işlemi başarılı", "success")
    }
}
function clearAllFilms(e) {
    if (confirm("Tüm Filimler Kalıcı Olarak Silinecek Eminmisiniz ?")) { // confirm fonksiyonu ile uyarı sorusu oluşturur.
        UI.displayMessages("Film Listesi Temizlendi", "success")
        UI.clearAllFilmsFromUI()
        Storage.clearAllFilmsFromUI()
    }
}