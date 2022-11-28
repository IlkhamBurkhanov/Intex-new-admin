import { useEffect, useState } from "react";
import DropDown from "../../../../BaseComponents/DropDown/DropDown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
// Images
import Drop from "../../../../Assets/Images/HomeContentImg/Drop.svg";
import MButton from "../../../../BaseComponents/MButton/MButton";
const env = process.env.REACT_APP_ALL_API;
const token = JSON.parse(window.localStorage.getItem("token"));
export default function AtributPage() {
  const [openRu, setOpenRu] = useState(false);
  const [openEn, setOpenEn] = useState(false);
  const [openUz, setOpenUz] = useState(false);
  const [data, setData] = useState([]);

  const initialValues = {
    name: "",
    productType: "",
    ruCountry: "",
    ruUserInfo: "",
    ruCategory: "",
    ruQuantity: "",
    enName: "",
    enProductType: "",
    enCountry: "",
    enUserInfo: "",
    enCategory: "",
    enQuantityy: "",
    uzName: "",
    uzproductType: "",
    uzCountry: "",
    uzUserInfo: "",
    uzCategory: "",
    uzQuantity: "",
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
  };
  // Manufactory get start
  useEffect(() => {
    axios
      .get(`${env}manufacturers/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data);
      });
  }, []);
  // Manufactory get end
  console.log(data);
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Username is required, at least 3 characters")
      .min(3, "Minimal 3 characters")
      .max(20, "Maximum 20 characters"),
    productType: Yup.string().required("Required"),
    ruCountry: Yup.string().required("Required"),
    ruUserInfo: Yup.string().required("Required"),
    ruCategory: Yup.string().required("Required"),
    ruQuantity: Yup.number().required("Required"),
    enName: Yup.string()
      .required("Username is required, at least 3 characters")
      .min(3, "Minimal 3 characters")
      .max(20, "Maximum 20 characters"),
    enProductType: Yup.string().required("Required"),
    enCountry: Yup.string().required("Required"),
    enUserInfo: Yup.string().required("Required"),
    enCategory: Yup.string().required("Required"),
    enQuantityy: Yup.number().required("Required"),
    uzName: Yup.string()
      .required("Username is required, at least 3 characters")
      .min(3, "Minimal 3 characters")
      .max(20, "Maximum 20 characters"),
    uzProductType: Yup.string().required("Required"),
    uzCountry: Yup.string().required("Required"),
    uzUserInfo: Yup.string().required("Required"),
    uzCategory: Yup.string().required("Required"),
    uzQuantity: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          formik.values = initialValues;
        }}
        className=" flex flex-col"
      >
        <DropDown
          dropName="Русский"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenRu(!openRu)}
          rotateDelete={`${
            openRu ? "-rotate-180 duration-300" : "-rotate-0 duration-300"
          }`}
        >
          <div
            className={`${
              openRu ? "h-auto overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Название продукта
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Каркасный басейн Intex прямоуголь.."
                  className={
                    formik.touched.name && formik.errors.name
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.name}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Призводства
                <select
                  name="productType"
                  id="name"
                  className={
                    formik.touched.productType && formik.errors.productType
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("productType")}
                >
                  <option>Выберите призводству продукта</option>
                  {data.map((item) => (
                    <option id={item.id} key={item.id}>
                      {item.manufacturer_ru}
                    </option>
                  ))}
                </select>
                {formik.touched.productType && formik.errors.productType ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.productType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Страна призводства
                <select
                  name="ruCountry"
                  id="name"
                  className={
                    formik.touched.ruCountry && formik.errors.ruCountry
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("ruCountry")}
                >
                  <option>salom</option>
                  <option>salom</option>
                </select>
                {formik.touched.ruCountry && formik.errors.ruCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.ruCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Название продукта
                <textarea
                  rows={5}
                  name="ruUserInfo"
                  id="name"
                  placeholder="Введите Описание продукта"
                  className={
                    formik.touched.ruUserInfo && formik.errors.ruUserInfo
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("ruUserInfo")}
                />
                {formik.touched.ruUserInfo && formik.errors.ruUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.ruUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Категория
                  <select
                    name="ruCategory"
                    id="name"
                    className={
                      formik.touched.ruCategory && formik.errors.ruCategory
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    {...formik.getFieldProps("ruCategory")}
                  >
                    <option>salom</option>
                    <option>salom</option>
                  </select>
                  {formik.touched.ruCategory && formik.errors.ruCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.ruCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px]">
                  Количество
                  <input
                    type="number"
                    name="ruQuantity"
                    id="name"
                    placeholder="Введите количество продукта"
                    className={
                      formik.touched.ruQuantity && formik.errors.ruQuantity
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps("ruQuantity")}
                  />
                  {formik.touched.ruQuantity && formik.errors.ruQuantity ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.ruQuantity}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="English"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenEn(!openEn)}
          rotateDelete={`${
            openEn ? "-rotate-180 duration-300" : "-rotate-0 duration-300"
          }`}
        >
          <div
            className={`${
              openEn ? "h-auto overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Название продукта
                <input
                  type="text"
                  name="enName"
                  id="name"
                  placeholder="Каркасный басейн Intex прямоуголь.."
                  className={
                    formik.touched.enName && formik.errors.enName
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("enName")}
                />
                {formik.touched.enName && formik.errors.enName ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzName}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Призводства
                <select
                  name="enProductType"
                  id="name"
                  className={
                    formik.touched.enProductType && formik.errors.enProductType
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("enProductType")}
                >
                  <option>Выберите призводству продукта</option>
                  {data.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.manufacturer_en}
                    </option>
                  ))}
                </select>
                {formik.touched.productType && formik.errors.productType ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzProductType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Страна призводства
                <select
                  name="enCountry"
                  id="name"
                  className={
                    formik.touched.enCountry && formik.errors.enCountry
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("enCountry")}
                >
                  <option>salom</option>
                  <option>salom</option>
                </select>
                {formik.touched.enCountry && formik.errors.enCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.enCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Название продукта
                <textarea
                  rows={5}
                  name="enUserInfo"
                  id="name"
                  placeholder="Введите Описание продукта"
                  className={
                    formik.touched.enUserInfo && formik.errors.enUserInfo
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("enUserInfo")}
                />
                {formik.touched.enUserInfo && formik.errors.enUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.enUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Категория
                  <select
                    name="enCategory"
                    id="name"
                    className={
                      formik.touched.enCategory && formik.errors.enCategory
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    {...formik.getFieldProps("enCategory")}
                  >
                    <option>salom</option>
                    <option>salom</option>
                  </select>
                  {formik.touched.enCategory && formik.errors.enCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.enCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px]">
                  Количество
                  <input
                    type="number"
                    name="enQuantityy"
                    id="name"
                    placeholder="Введите количество продукта"
                    className={
                      formik.touched.enQuantityy && formik.errors.enQuantityy
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps("enQuantityy")}
                  />
                  {formik.touched.enQuantityy && formik.errors.enQuantityy ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.enQuantityy}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="O’zbekcha"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenUz(!openUz)}
          rotateDelete={`${
            openUz ? "-rotate-180 duration-300" : "-rotate-0 duration-300"
          }`}
        >
          <div
            className={`${
              openUz ? "h-auto overflow-auto" : "h-0 overflow-hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Название продукта
                <input
                  type="text"
                  name="uzName"
                  id="name"
                  placeholder="Каркасный басейн Intex прямоуголь.."
                  className={
                    formik.touched.uzName && formik.errors.uzName
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("uzName")}
                />
                {formik.touched.uzName && formik.errors.uzName ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzName}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Призводства
                <select
                  name="uzProductType"
                  id="name"
                  className={
                    formik.touched.uzProductType && formik.errors.uzProductType
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("uzProductType")}
                >
                  <option>salom</option>
                  <option>salom</option>
                </select>
                {formik.touched.productType && formik.errors.productType ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzProductType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Страна призводства
                <select
                  name="uzCountry"
                  id="name"
                  className={
                    formik.touched.uzCountry && formik.errors.uzCountry
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  {...formik.getFieldProps("uzCountry")}
                >
                  <option>salom</option>
                  <option>salom</option>
                </select>
                {formik.touched.uzCountry && formik.errors.uzCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Название продукта
                <textarea
                  rows={5}
                  name="uzUserInfo"
                  id="name"
                  placeholder="Введите Описание продукта"
                  className={
                    formik.touched.uzUserInfo && formik.errors.uzUserInfo
                      ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                      : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("uzUserInfo")}
                />
                {formik.touched.uzUserInfo && formik.errors.uzUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.uzUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Категория
                  <select
                    name="uzCategory"
                    id="name"
                    className={
                      formik.touched.uzCategory && formik.errors.uzCategory
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    {...formik.getFieldProps("uzCategory")}
                  >
                    <option>salom</option>
                    <option>salom</option>
                  </select>
                  {formik.touched.uzCategory && formik.errors.uzCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.uzCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px]">
                  Количество
                  <input
                    type="number"
                    name="uzQuantity"
                    id="name"
                    placeholder="Введите количество продукта"
                    className={
                      formik.touched.uzQuantity && formik.errors.uzQuantity
                        ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                        : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps("uzQuantity")}
                  />
                  {formik.touched.uzQuantity && formik.errors.uzQuantity ? (
                    <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                      {formik.errors.uzQuantity}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <MButton BType="next" type="submit">
          Submit
        </MButton>
      </form>
    </div>
  );
}
