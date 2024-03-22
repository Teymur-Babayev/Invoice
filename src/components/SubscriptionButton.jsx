import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "../hooks/useAuth";
import { toast } from "../components/ui/use-toast";
import { User as UserCtrl } from "../api/fb.user";
import { SubsCtrl } from "../api/check/fb.subs";
import { Auth } from "../api/fb.invoice";
import { useNavigate } from "react-router-dom";

const Subs = new SubsCtrl();
const UserCl = new UserCtrl();
let precio;
const SubscriptionButton = ({ price, plan }) => {
  const { User ,updateUser} = useAuth();
  const AuthCtrl = new Auth();
  const navigate = useNavigate()
  
  const getPriceInPesos = (price) => {
   
    let dolarTaza = 0.0501;

    if (price == 579) {
      let pesos = price * dolarTaza;
      precio = pesos.toFixed(2).toString();
    }

    if (price == 749) {
      let pesos = price * dolarTaza;
      precio = pesos.toFixed(2).toString();
    }

    if (price == 1049) {
      let pesos = price * dolarTaza;
      precio = pesos.toFixed(2).toString();
    }

    return precio.toString();
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getPriceInPesos(price),
            // Esto debería ser el monto de la suscripción.
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    console.log(data,"---------------------52")
    try {
      let fechaActual = new Date();
  
      let fechaDeCreacion = `${fechaActual.getFullYear()}-${String(
        fechaActual.getMonth() + 1
      ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;
  
      // Sumamos 1 mes a la fecha actual
      fechaActual.setMonth(fechaActual.getMonth() + 1);
      let fechaDeFinalizacion = `${fechaActual.getFullYear()}-${String(
        fechaActual.getMonth() + 1
      ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;
      
      console.log(fechaDeFinalizacion, 67);
      
      let subData = {
        uid: User?.uid,
        fechaDeCreacion: fechaDeCreacion,
        fechaDeFinalizacion: fechaDeFinalizacion,
        Plan: plan,
      };
  
      const result = await Subs.createBlog(subData);
      await UserCl.UpdatePlanById(subData.uid,plan);
      console.log(precio, "hi------------subscirption");
      var email = localStorage.getItem("userEmail");
      await AuthCtrl.New_PayInformation(email,fechaDeFinalizacion,precio);

      await updateUser(subData);
      console.log("go--")
      // if(!User?.rfc){
        navigate("/success");
        // navigate("/");
      // }else{
        // if (result) {
        //   toast({
        //     title:`Felicidades Renovaste el plan existosamente`,
        //   });
        // } else {
        //   console.error("Error al crear el blog");
        // }
      // }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWGI6HDW9SghDpbPpaT-RkMurAgmQ1TVyyRMwhM0YgHMRitrVyRCFSTk0kgUnvlK_XawzixV7s_JmHI3",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default SubscriptionButton;
