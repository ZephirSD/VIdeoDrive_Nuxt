<template>
  <NavHeader />
  <div class="isolate px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Contact
      </h2>
    </div>
    <Form>
      <form
        class="mx-auto mt-16 max-w-xl sm:mt-20"
        @submit.prevent="submitContact"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-2.5">
              <Field
                name="email"
                autocomplete="email"
                :rules="validateEmail"
                v-model="emailValue"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage name="email" class="text-red-400 text-sm" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="phone-number"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Numéro de téléphone</label
            >
            <div class="relative mt-2.5">
              <div class="absolute inset-y-0 left-0 flex items-center">
                <label for="country" class="sr-only">Pays</label>
                <select
                  id="country"
                  name="country"
                  v-model="selectPays"
                  class="h-full rounded-md border-0 bg-transparent bg-none py-0 px-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option disabled value="">Choisir le pays</option>
                  <option value="FR">🇫🇷 FR</option>
                  <option value="RE">🇷🇪 RE</option>
                </select>
              </div>
              <Field
                name="phone-number"
                autocomplete="tel"
                :rules="validatePhone"
                v-model="telephoneValue"
                class="block w-full rounded-md border-0 px-3.5 py-2 pl-40 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <ErrorMessage name="phone-number" class="text-red-400 text-sm" />
          </div>
          <div class="sm:col-span-2">
            <label
              for="message"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Message</label
            >
            <div class="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows="4"
                v-model="messsageValue"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div class="flex gap-x-4 sm:col-span-2">
            <div class="flex h-6 items-center">
              <input
                type="checkbox"
                class="toggle"
                checked
                v-model="toogleConf"
              />
            </div>
            <label class="text-sm leading-6 text-gray-600" id="switch-1-label">
              Vous acceptez les conditions de confidentialité
            </label>
          </div>
        </div>
        <div class="mt-10">
          <button
            :disabled="
              // Vrai / Vrai / Faux
              (boolDisableButton.email &&
                boolDisableButton.phone &&
                !toogleConf) ||
              // Faux / Vrai / Faux
              (!boolDisableButton.email &&
                boolDisableButton.phone &&
                !toogleConf) ||
              // Faux / Faux / Faux
              (!boolDisableButton.email &&
                !boolDisableButton.phone &&
                !toogleConf) ||
              // Vrai / Faux / Faux
              (boolDisableButton.email &&
                !boolDisableButton.phone &&
                !toogleConf) ||
              // Vrai / Faux / Vrai
              (boolDisableButton.email &&
                !boolDisableButton.phone &&
                toogleConf) ||
              // Faux / Vrai / Vrai
              (!boolDisableButton.email &&
                boolDisableButton.phone &&
                toogleConf) ||
              // Vrai / Vrai / Vrai
              (boolDisableButton.email && boolDisableButton.phone && toogleConf)
            "
            type="submit"
            class="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            Envoyer
          </button>
        </div>
      </form>
    </Form>
  </div>
  <FooterPage />
</template>

<script setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import baseImg from "~/utils/baseImg";


const selectPays = ref("");
const boolDisableButton = ref({ email: true, phone: true });
const toogleConf = ref(false);
const emailValue = ref('');
const telephoneValue = ref('');
const messsageValue = ref('');
const router = useRouter();
const supabase = useSupabaseClient();


useHead({
  title: "VideoGame Website | Contact",
});

baseImg(supabase);

const submitContact = async () => {
  try {
    const { data } = await useFetch('/api/contact',{
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailValue.value,
          telephone: telephoneValue.value,
          message: messsageValue.value
        })
    });
    if (data.value.success) {
      emailValue.value = "";
      telephoneValue.value = "";
      messsageValue.value = "";
      toogleConf.value = false;
      Toastify({
        text: "Merci d'avoir rempli le formulaire",
        duration: 4500,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
          background: "#bec000",
        },
      }).showToast();
      router.push("/");
    } else {
      console.log(data.value.error);
    }
  } catch (error) {
    console.log(error);
  }
};
const validateEmail = (value) => {
  if (!value) {
    boolDisableButton.value.email = true;
    return "Le champ email est requis";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    boolDisableButton.value.email = true;
    return "L'email n'est pas valide";
  }
  boolDisableButton.value.email = false;
  return true;
};
const validatePhone = (value) => {
  if (!value) {
    boolDisableButton.value.phone = true;
    return "Le champ téléphone est requis";
  }
  const regexNumFrance = /^(?:(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4})$/;
  const regexNumReunion = /^(?:(?:\+262|0)(?:62|692)(?:[\s.-]?\d{2}){3})$/;
  if (selectPays.value == "FR") {
    if (!regexNumFrance.test(value)) {
      boolDisableButton.value.phone = true;
      return "Ceci n'est pas un numéro de France";
    }
  } else if (selectPays.value == "RE") {
    if (!regexNumReunion.test(value)) {
      boolDisableButton.value.phone = true;
      return "Ceci n'est pas un numéro de la Réunion 0692******";
    }
  }
  boolDisableButton.value.phone = false;
  return true;
};
</script>
