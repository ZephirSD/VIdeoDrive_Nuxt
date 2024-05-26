<template>
  <div class="card bg-base-100 shadow-xl">
    <figure v-if="listeImage.some((lsImage) => jeux.jeux.nom === lsImage.nomJeux)">
      <NuxtImg
        v-bind:src="`data:image/jpeg;base64,${listeImage.find((lsImage) => jeux.jeux.nom === lsImage.nomJeux).dataImage}`"
        loading="lazy"
        class="object-cover object-center h-56 w-full"
        alt="jeux_videos"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-base">
        {{
          jeux.jeux.nom.length > 22
            ? `${jeux.jeux.nom.substring(0, 19)}...`
            : jeux.jeux.nom
        }}
      </h2>
      <div class="card-actions" v-if="diffJours <= 7">
        <div class="badge badge-outline">{{ jeux.jeux.genre }}</div>
        <div class="badge badge-secondary">NEW</div>
      </div>
      <div class="card-actions" v-else>
        <div class="badge badge-outline">{{ jeux.jeux.genre }}</div>
      </div>
      <p class="text-2xl">{{ jeux.jeux.prix_neuf }}€</p>
      <div class="card-actions justify-end">
        <div v-if="donnees.some((donnee) => donnee.id === jeux.jeux.id)">
          <button class="btn btn-primary text-white">
            <font-awesome :icon="['fas', 'check']" />
          </button>
        </div>
        <div v-else>
          <button
            class="btn btn-primary text-white"
            @click="ajoutPanier(jeux.jeux)"
          >
            <font-awesome :icon="['fas', 'cart-shopping']" />
          </button>
        </div>
        <NuxtLink :to="`/jeux/${jeux.jeux.id}`">
          <button class="btn btn-primary text-white">
            <font-awesome :icon="['fas', 'chevron-right']" />
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/jeux_stores";
import { storeToRefs } from "pinia";
import baseImg from "~/utils/baseImg";
const jeuxStores = useStore();
const { donnees } = storeToRefs(jeuxStores);
const imageStores = useImageJeuxStores();
const { listeImage } = storeToRefs(imageStores);
const supabase = useSupabaseClient();

const jeux = defineProps(["jeux"]);
const today = Date.now();
const dateCreation = new Date(jeux.jeux.date_creation);
const diffMilli = today - dateCreation;
const diffJours = Math.floor(diffMilli / (1000 * 60 * 60 * 24));

const ajoutPanier = (jeux) => {
  jeuxStores.ajoutPrix(jeux.prix_neuf);
  jeuxStores.addJeux({
    id: jeux.id,
    nom: jeux.nom,
    prix: jeux.prix_neuf,
    image: jeux.image_encode,
  });
};

baseImg(supabase);
</script>
