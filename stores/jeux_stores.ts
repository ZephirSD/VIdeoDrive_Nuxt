import { defineStore } from "pinia";

interface Jeux {
  id: number;
  nom: string;
  prix: number;
}

export const useStore = defineStore("jeux", {
  state: () => {
    return {
      donnees: [] as Jeux[],
      total: 0,
    };
  },
  actions: {
    addJeux(jeux: Jeux){
      this.donnees.push(jeux);
    },
    supprJeux(id: number){
      const index = this.donnees.findIndex(jeu => jeu.id === id);
      if(index !== -1){
        this.donnees.splice(index, 1);
      }
    },
    ajoutPrix(prix: number){
      this.total += prix;
    },
    supprPrix(prix: number){
      this.total -= prix;
    } 
  },
});
