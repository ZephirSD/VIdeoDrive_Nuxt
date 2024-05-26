<template>
  <NavHeader />
  <div>
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">
        Listes des Jeux
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div v-for="jeux in liste_jeux" :key="jeux.id" class="group relative">
          <CarteProduit :jeux="jeux" />
        </div>
      </div>
    </div>
  </div>
  <FooterPage />
</template>

<script setup>
import CarteProduit from "~/components/CarteProduit.vue";
import baseImg from "~/utils/baseImg";
const supabase = useSupabaseClient();

useHead({
  title: "VideoGame Website | Listes des Jeux",
});


const { data: liste_jeux } = await useAsyncData("jeux", async () => {
  const { data } = await supabase
  .from("jeux")
  .select("*")
  .order("nom", { ascending: true }, );
  return data;
});

baseImg(supabase);
</script>
