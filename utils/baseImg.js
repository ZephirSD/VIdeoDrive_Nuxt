import { storeToRefs } from "pinia";
import { useImageJeuxStores } from "~/stores/imageJeux_stores";

export default async function baseImg(supabase) {
  const { data: listesJ } = await useAsyncData("listeJeux", async () => {
    const { data } = await supabase
      .from("jeux")
      .select("*")
    return data;
  });

  const imageStores = useImageJeuxStores();
  const { listeImage } = storeToRefs(imageStores);
  if (listeImage.value.length <= 0) {
    listesJ.value.forEach((liste) => {
      imageStores.addListe({
        nomJeux: liste.nom,
        dataImage: liste.image_encode,
      });
    });
  }
}
