import { useServerStripe } from "#stripe/server";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const stripe = await useServerStripe(event);
  const body = await readBody(event);
  try {
    
    // const tokenCard = await stripe.tokens.create();
    // const paiementMethod = await stripe.paymentMethods.create({
    //   type: "card",
    //   card : {
    //     token : tokenCard
    //   }
    // })
    const totalStringTransf = body.montant.replace('.', '');
    const totalStripe = Number.parseInt(totalStringTransf);
    const paiement = stripe.paymentIntents
      .create({
        amount: Number.parseInt(totalStripe),
        currency: "EUR",
        description: `Achat de ${body.liste} - VideoGame`,
        // payment_method: paiementMethod,
        automatic_payment_methods: {
          enabled: true,
        },
      })
      .then(async (req) => {
        if (
          req.status === "succeeded" ||
          req.status === "requires_payment_method"
        ) {
          const { data, error } = await supabase
            .from("paiement")
            .insert([
              {
                compte: "pi_3PFDeqDP1g9xjqVS0MCZGZhz",
                liste_jeux: body.liste,
                montant_total: Number.parseInt(body.montant),
              },
            ])
            .select().then(async (req) => {
              if(req.status === 201){
                return{
                  message: false
                }
              }
            });
        }
      });
  } catch (error) {
    return { message: error.message };
  }
});
