<template>
  <NavHeader />
  <section
    class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <div
      class="max-w-screen-xl px-4 mx-auto 2xl:px-0"
      v-for="jeu in jeux_id"
      :key="jeu.id"
    >
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <NuxtImg
            v-bind:src="`data:image/jpeg;base64,${listeImage.find((lsImage) => jeu.nom === lsImage.nomJeux).dataImage}`"
            alt="jeux"
            class="w-full dark:hidden"
            loading="lazy"
          />
          <NuxtImg
            v-bind:src="`data:image/jpeg;base64,${listeImage.find((lsImage) => jeu.nom === lsImage.nomJeux).dataImage}`"
            alt="jeux"
            class="w-full hidden dark:block"
            loading="lazy"
          />
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1 class="text-xl font-semibold" ref="titreJeu">
            {{ jeu.nom }}
          </h1>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p class="text-2xl font-extrabold">{{ jeu.prix_neuf }}€</p>
            <p class="text-xl font-bold">{{ jeu.prix_occasion }}€</p>
          </div>

          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <div v-if="donnees.some((donnee) => donnee.id === jeu.id)">
              <button class="btn">
                <font-awesome :icon="['fas', 'check']" />
                Déjà au panier
              </button>
            </div>
            <div v-else>
              <button class="btn" @click="ajoutPanier(jeu)">
                <font-awesome :icon="['fas', 'cart-shopping']" />
                Ajouter au panier
              </button>
            </div>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p class="mb-6 text-gray-500 dark:text-gray-400">
            {{ jeu.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "~/stores/jeux_stores";
import { storeToRefs } from "pinia";
import baseImg from "~/utils/baseImg";
const jeuxStores = useStore();
const { donnees } = storeToRefs(jeuxStores);
const imageStores = useImageJeuxStores();
const { listeImage } = storeToRefs(imageStores);


const route = useRoute();
const supabase = useSupabaseClient();

useHead({
  title: `VideoGame Website | (Nom du Jeu)`,
});

const { data: jeux_id } = await useAsyncData("jeux", async () => {
  const { data } = await supabase
    .from("jeux")
    .select("*")
    .eq("id", route.params.id);
  return data;
});

baseImg(supabase);

const ajoutPanier = (jeux) => {
  jeuxStores.ajoutPrix(jeux.prix_neuf);
  jeuxStores.addJeux({
    id: jeux.id,
    nom: jeux.nom,
    prix: jeux.prix_neuf,
    image: jeux.image_encode,
  });
};
</script>
