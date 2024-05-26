<template>
  <NavHeader />
  <div>
    <section
      class="relative after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0"
    >
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative">
        <div class="grid grid-cols-12">
          <div
            class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto"
          >
            <div
              class="flex items-center justify-between pb-8 border-b border-gray-300"
            >
              <h2 class="font-manrope font-bold text-4xl leading-10 text-black">
                Panier
              </h2>
            </div>
            <!--  -->
            <div v-if="donnees.length > 0" v-for="donn in donnees">
              <CartePanier :panier="donn" />
            </div>
            <div v-else>
              <h3>Aucun produit dans le panier</h3>
            </div>
            <!--  -->
          </div>
          <div
            class="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24"
          >
            <h2
              class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300"
            >
              Paiement
            </h2>
            <div>
              <!-- {{ stripe ? stripe : "Loading" }} -->
            </div>
            <div class="mt-8">
              <label
                class="flex items-center mb-1.5 text-gray-600 text-sm font-medium"
                >Numéro de Carte&nbsp;<span class="text-orange-500">*</span>
              </label>
              <div class="flex pb-6">
                <div class="relative w-full">
                  <input
                    type="tel"
                    class="mt-1 p-2 block w-full h-11 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                    :disabled="donnees.length <= 0"
                    v-model="carteCredit"
                    @input="formatCarteCredit"
                    maxlength="19"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                  />
                </div>
              </div>
              <div class="flex pb-4 w-full">
                <div class="relative w-full">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        for="dateExpiration"
                        class="block text-sm font-medium text-gray-700"
                        >Date d'expiration&nbsp;<span class="text-orange-500"
                          >*</span
                        ></label
                      >
                      <input
                        type="text"
                        id="dateExpiration"
                        name="dateExpiration"
                        class="mt-1 p-2 block w-full shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                        :disabled="donnees.length <= 0"
                        v-model="dateExpir"
                      />
                    </div>
                    <div>
                      <label
                        for="cvv"
                        class="block text-sm font-medium text-gray-700"
                        >CVC&nbsp;<span class="text-orange-500">*</span></label
                      >
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        class="mt-1 p-2 block w-full text-gray-900 shadow-xs bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                        placeholder="xxx"
                        :disabled="donnees.length <= 0"
                        v-model="cvc"
                      />
                    </div>
                  </div>
                  <card-number-element />
                </div>
              </div>
              <button
                class="w-full text-center bg-primary rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 disabled:opacity-50"
                @click="clickPayer"
                :disabled="total <= 0"
              >
                <div v-if="boolPayer">
                  <span class="loading loading-dots loading-sm"></span>
                </div>
                <div v-else>Payer {{ total.toFixed(2) }}€</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/jeux_stores";
import { storeToRefs } from "pinia";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import baseImg from "~/utils/baseImg";

const jeuxStores = useStore();
const { donnees, total } = storeToRefs(jeuxStores);
const supabase = useSupabaseClient();
let carteCredit = defineModel("carteCredit");
let cvc = defineModel("cvc");
let dateExpir = defineModel("dateExpir");
let boolPayer = ref(false);
// const config = useRuntimeConfig();
const liste_jeux = donnees.value.map((jeux) => jeux.nom);
// console.log(liste_jeux);
const router = useRouter();

baseImg(supabase);

const clickPayer = async () => {
  try {
    boolPayer.value = true;
    setTimeout(() => {
      Toastify({
        text: "Merci, vous avez effectué votre paiement",
        duration: 4500,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
          background: "#bec000",
        },
      }).showToast();
      donnees.value = [];
      total.value = 0;
      boolPayer.value = false;
      router.push('/');
    }, 2500);

    // console.log(carteCredit.value);
    // console.log(cvc.value);
    // console.log(dateExpir.value);
    // const fetchStripe = useFetch("/api/stripeServer", {
    //   method: "POST",
    //   body: {
    //     montant: total.value.toFixed(2),
    //     // paiementID: 'test',
    //     liste: liste_jeux.join(", "),
    //     carteCredit: carteCredit.value,
    //     cvc: cvc.value,
    //     dateExpir: dateExpir.value,
    //   },
    // });
    // fetchStripe.then((res) => console.log(res));
    console.log("Click");
    // const { error, paymentMethod } = await stripe.
  } catch (error) {
    console.error(error);
  }
};
</script>
