class Storage{
    static addFilmStorage (newFilm){
        let film = this.getFilmsFromStorage() // oluşturulan storage bilgilerini buraya çağırır
        film.push(newFilm) // çekilern verilere yeni gelen veri dahil edilir
        localStorage.setItem("films",JSON.stringify(film))// oluşturulan dizi içersinde bulunan objeler
    }                                                     //tekrar json.stringify ile dönüşümü yapılarak storageye set edilir
    static getFilmsFromStorage (){ //kayıtlı storage çağıran fonksiyon
        let films
        if(localStorage.getItem("films")=== null){ //storage de  önceden oluşan bir film keyli değer yoksa 
            films=[]                                // films şeklinde bir arrey oluştur
        }else{
            films=JSON.parse(localStorage.getItem("films")) // varsa onu dizi şekline çeirerek al
        }
        return films
    }
    static deleteFilmFromStorage (item){
        let films = this.getFilmsFromStorage() // storagedeki arrayı alır
        films.forEach(function(film,index){ // aldığı arrayda içersinde gezinerek tıklanan elemanı bulucaz
            if(film.title === item){
                films.splice(index,1)
            }
        });
        localStorage.setItem("films",JSON.stringify(films))
    }
    static clearAllFilmsFromUI (){
        localStorage.removeItem("films")
    }
}
