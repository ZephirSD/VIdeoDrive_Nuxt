<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
          <li><NuxtLink to="/liste-jeux">Liste des Jeux</NuxtLink></li>
          <li><NuxtLink to="/panier">
            Panier
          </NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          </ul>
        </div>
        <NuxtLink to="/" class="btn btn-ghost text-xl">VideoGame</NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/liste-jeux">Liste des Jeux</NuxtLink></li>
          <li class="indicator"><NuxtLink to="/panier">
            <div v-if="donnees.length > 0">
              <span class="indicator-item badge badge-secondary">{{ donnees.length }}</span>
            </div>
            Panier
          </NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
      <div class="navbar-end">
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '~/stores/jeux_stores';
import { storeToRefs } from "pinia";
const jeuxStores = useStore();
const { donnees } = storeToRefs(jeuxStores);

</script>
