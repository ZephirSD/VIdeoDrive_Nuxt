<template>
  <NavHeader />
  <div>
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">
        Nouveautés
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div v-for="jeux in liste_jeux" :key="jeux.id" class="group relative">
          <CarteProduit :jeux="jeux" />
        </div>
      </div>
    </div>
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">
        Best Game
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
  <FooterPage/>
</template>

<script setup>
import CarteProduit from "~/components/CarteProduit.vue";

useHead({
  title: 'VideoGame Website'
})

const supabase = useSupabaseClient();

const {data: liste_jeux} = await useAsyncData('jeux', async () => {
  const { data } = await supabase.from('jeux').select('*').order("date_creation",{ ascending: false }).limit(4)
  return data;
});
</script>
