import { defineStore } from "pinia";

interface ImgJeux {
  nomJeux: string;
  dataImage: string;
}

export const useImageJeuxStores = defineStore("imagejeux", {
  state: () => {
    return {
      listeImage: [] as ImgJeux[],
    };
  },
  actions: {
    addListe(liste: ImgJeux){
        this.listeImage.push(liste);
    }
  },
});
