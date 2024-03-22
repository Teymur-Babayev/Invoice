import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  deleteField
} from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { ConnectingAirportsOutlined } from "@mui/icons-material";

var clientEmail = "";
var file = "";
var created_At = "", flag = 0;
let UserCollectionData = {};
var invoice_Id = "";

export const uploadSingleFile = async (formData, userData) => {

  for (const [key, value] of formData.entries()) {
    console.log(value, value.name);
    file = value;
    break;
  }
  const fileExtension = file.name;
  var uid = uuidv4();
  const firebaseFileName = `${uid}.${fileExtension}`;

  const fileRef = ref(
    storage,
    `${uid}/${firebaseFileName}`
  );

  const uploadTask = uploadBytesResumable(fileRef, file);

  await new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progreso de la carga
      },
      (error) => {
        // Error
        reject(error);
      },
      () => {
        // Completado
        resolve();
      }
    );
  });

  const downloadURL = await getDownloadURL(fileRef);

  clientEmail = userData[1];
  created_At = userData[15]
  console.log(formData, downloadURL, clientEmail, 63)

  let datas = {
    address: userData[2],
    avatar: downloadURL,
    business_name: userData[7],
    cfd: userData[5],
    created_at: userData[15],
    currency: "$",
    email: userData[1],
    exchange_rate: userData[11],
    folio: userData[10],
    invoice_type: userData[13],
    name: userData[0],
    pay_method: userData[14],
    pay_way: userData[12],
    phone: userData[3],
    postal_code: userData[4],
    rfc: userData[6],
    series: userData[9],
    tax_regime: userData[8],
  }

  await addDoc(collection(db, "Invoices"), datas).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
    invoice_Id = docRef.id;
    return "success";
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

export const change_information = async (formData, userData) => {

  console.log(formData, userData, 100)
  if (formData !== undefined && formData !== null) {
    for (const [key, value] of formData.entries()) {
      console.log(value, value.name);
      file = value;
      break;
    }
    const fileExtension = file.name;
    var uid = uuidv4();
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef_ = ref(
      storage,
      `${uid}/${firebaseFileName}`
    );

    const uploadTask_ = uploadBytesResumable(fileRef_, file);

    await new Promise((resolve, reject) => {
      uploadTask_.on(
        "state_changed",
        (snapshot) => {
          // Progreso de la carga
        },
        (error) => {
          // Error
          reject(error);
        },
        () => {
          // Completado
          resolve();
        }
      );
    });

    const downloadURL_ = await getDownloadURL(fileRef_);
    flag = 1;
  }

  clientEmail = userData[1];
  created_At = userData[15]

  if (flag == 0) {
    UserCollectionData = {

      address: userData[1],

      phone: userData[2],
    };
  } else {
    UserCollectionData = {
      address: userData[1],
      avatar: downloadURL_,
      name: userData[0],
      phone: userData[2],
    };
  }
  const q = query(collection(db, 'User'), where('email', '==', clientEmail));
  const querySnapshot = await getDocs(q);

  const getValue = querySnapshot.docs.map(doc => doc.data());

  await updateDoc(getValue, UserCollectionData);

  console.log("success");

  return "success";

}

export class Auth {

  async Edit_item_list(userItems, ServiceItems) {

    try {
      const q = query(collection(db, 'products_services'), where('invoice_id', '==', Edit_id));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => doc.data());

      const docRef = doc(db, "Invoices", Edit_id);
      const docSnap = (await getDoc(docRef));
      console.log(Edit_id,docSnap.data(), 310)

      return { "services": products, "invoices": docSnap.data() };
    } catch (error) {
      console.error('Error getting products with value :', error);
      return [];
    }
  }

  async Invoice(serviceData) {

    console.log(serviceData, serviceData[13], 60);
    let ProductCollectionData = {
      created_at: created_At,
      description: serviceData[4],
      discount: serviceData[3],
      email: clientEmail,
      identification: serviceData[1],
      invoice_id: invoice_Id,
      price: serviceData[2],
      product_name: serviceData[0],
      quantity: serviceData[5],
      tax: "$",
      unit: serviceData[6]
    };
    await addDoc(collection(db, "products_services"), ProductCollectionData);
  }

  async View_Clients() {
    const get_Invoices = await getDocs(collection(db, "User"));
    const Invoices = get_Invoices.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { "get_Invoices": Invoices };
  }

  async Delete_User(e) {

    let allItems = await getDocs(query(collection(db, "User"), where("email", "==", e)))

    await Promise.all(allItems.docs.map((item) => deleteDoc(item.ref)));

    await deleteDoc(doc(db, "Invoices", e));

    await deleteDoc(doc(db, "products_services", e));
    return "success";
  }

  async get_Service(data_id) {
    const querySnapshot = await getDoc(doc(db, 'Invoices/' + data_id));
    return [querySnapshot.data()];
  }

  async View_InvoiceList(e) {

    const q = query(collection(db, 'products_services'), where('email', '==', e));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => doc.data());
    const getValue = query(collection(db, 'Invoices'), where('email', '==', e));
    const value = await getDocs(getValue);
    const invoices = value.docs.map(doc => doc.data());

    return { "service": products, "get_invoices": invoices };
  }

  async delete_item(e) {
    try {

      let allItems = await getDocs(query(collection(db, "products_services"), where("invoice_id", "==", e)))

      await Promise.all(allItems.docs.map((item) => deleteDoc(item.ref)));

      await deleteDoc(doc(db, "Invoices", e));

      return "success";
    
    } catch (error) {
      console.error("Error al eliminar el blog:", error);
      return false;
    }
  }

  async Search_Client(data) {

    const getValue = query(collection(db, 'User'), where('email', '==', data));
    const value = await getDocs(getValue);
    const search_data = value.docs.map(doc => doc.data());

    return { "search_data": search_data };
  }

  async profile_change(data) {

    const getValue = query(collection(db, 'User'), where('email', '==', data));
    const value = await getDocs(getValue);
    const search_data = value.docs.map(doc => doc.data());

    const getPayHistory = query(collection(db, 'PaymentHistory'), where('UserEmail', '==', data));
    const v = await getDocs(getPayHistory);
    const pay_history = v.docs.map(doc => doc.data());
    return { "search_data": search_data, "pay_history" : pay_history};
  }

  async Search_Service(data) {

    const getValue = query(collection(db, 'products_services'), where('product_name', '==', data));
    const value = await getDocs(getValue);
    const search_data = value.docs.map(doc => doc.data());

    return { "search_data": search_data };
  }
  
  async Get_information(e) {

    try {
      const q = query(collection(db, 'products_services'), where('email', '==', e));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => doc.data());


      const getValue = query(collection(db, 'Invoices'), where('email', '==', e));
      const value = await getDocs(getValue);
      const invoices = value.docs.map(doc => doc.data());

      return { "services": products, "invoices": invoices };

      console.log(getValue)
    } catch (error) {
      console.error('Error getting products with value :', error);
      return [];
    }
  }
  
  async Get_InvoiceInformation(Edit_id) {

    try {
      const q = query(collection(db, 'products_services'), where('invoice_id', '==', Edit_id));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => doc.data());

      const docRef = doc(db, "Invoices", Edit_id);
      const docSnap = (await getDoc(docRef));
      console.log(Edit_id,docSnap.data(), 310)

      return { "services": products, "invoices": docSnap.data() };
    } catch (error) {
      console.error('Error getting products with value :', error);
      return [];
    }
  }

  async New_PayInformation(email,fechaDeFinalizacion,precio) {

    let ProductCollectionData_ = {
      Created_at: fechaDeFinalizacion,
      PayMethod: "PayPal",
      Total_Price: precio,
      UserEmail: email
    };
    await addDoc(collection(db, "PaymentHistory"), ProductCollectionData_);
  }
}



