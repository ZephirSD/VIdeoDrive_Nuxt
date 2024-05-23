<template>
  <div>
    <div
      class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group"
    >
      <div class="w-full md:max-w-[126px]">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="jeux"
          class="mx-auto"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 w-full">
        <div class="md:col-span-2">
          <div class="flex flex-col max-[500px]:items-center gap-3">
            <h6 class="font-semibold text-base leading-7 text-black">
              {{ panier.panier.nom }}
            </h6>
          </div>
        </div>
        <div
          class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full"
        >
          <p
            class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600"
          >
            {{ panier.panier.prix }}€
          </p>
        </div>
        <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <button @click="suppPanier(panier.panier.id, panier.panier.prix)">
            <font-awesome :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/jeux_stores';
const jeuxStores = useStore();
const { donnees, total } = storeToRefs(jeuxStores);

const panier = defineProps(["panier"]);
const suppPanier = (id, prix) => {
  jeuxStores.supprPrix(prix);
  jeuxStores.supprJeux(id);
  if(donnees.value.length <= 0){
    total.value = 0;
  }
}
</script>
