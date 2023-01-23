import React from "react";
import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
import TableHeader from "../../components/TableHeader/TableHeader";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";
import TableRow2 from "../../components/TableRow/orderTable";
import axios from "axios";
import { useSelector } from "react-redux";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";

export default function ProductOrder() {
  const [data, setData] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalpage] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteAll, setDeleteAll] = React.useState([]);

  const env = process.env.REACT_APP_ALL_API;

  const token = JSON.parse(window.localStorage.getItem("token"));

  const lang = useSelector((state) => state.data.lang);
  const search = useSelector((state) => state.data.search);

  function searchProduct(inputValue, data) {
    let regex = new RegExp(inputValue, "gi");
    const filterInput = data.filter((product) =>
      product[`name_${lang}`]?.match(regex)
    );

    return filterInput;
  }

  const handleChange = (evt) => {
    if (evt.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };
  //intex-shop-production.up.railway.app/api/orders?page=0&limit=10

  https: React.useEffect(() => {
    axios
      .get(
        `https://intex-shop-production.up.railway.app/api/orders?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res?.data.result);

        setTotalpage(res.data?.total_count.count);
      });
  }, [limit, page, token, refresh]);

  const IdArray = data.result?.map((res) => res.id);

  const DeleteAll = (e) => {
    axios
      .delete(
        `${env}orders/deleteAll`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: isChecked ? IdArray : deleteAll,
          },
        }
      )
      .then((res) => {
        // (res, IdArray);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err, IdArray);
      });
  };
  // ("with id", deleteAll);

  // (deleteAll.length);

  return (
    <>
      <div className="bg-white border-b rounded-xl mb-[100px] ">
        <div className="flex py-3 px-4 items-center">
          <input
            className="mr-3 w-4 h-4 cursor-pointer"
            type="checkbox"
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="text-[#b9b9b9] mr-3">
            {isChecked ? data.result.length : deleteAll.length}, Выбрано
          </span>
          <img
            className="cursor-pointer"
            onClick={DeleteAll}
            src={Trash}
            alt="Trash icon"
          />
        </div>
        <div className="table-scroll overflow-x-scroll pb-2.5 bg-white">
          <table className="w-full pt-12">
            <THead />
            <TBody />
          </table>
        </div>
        <div className="flex border-t mt-2.5 p-3 justify-between items-center pr-5">
          <div className="flex">
            <select
              className="rounded-md bg-[#f2f2f2] outline-none w-12 px-1 mr-3"
              onChange={(evt) => setLimit(evt.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <span className="m-0 mr-3 text-paginationColor text-sm">
              Элементы на каждой странице
            </span>
            <span className="text-sm text-paginationButtonColor">
              1-5 из {totalPage} предметов
            </span>
          </div>
          <div className="flex items-center">
            <input
              className="w-12 text-center outline-none text-sm text-paginationButtonColor rounded-md bg-[#f2f2f2]  "
              type="nubmer"
              value={page}
              onChange={(evt) => setPage(evt.target.value)}
              maxLength={1}
            />
            <span className="mr-3.5 text-sm text-paginationButtonColor">
              из {totalPage / limit} страниц
            </span>
            <span className="flex">
              <button
                onClick={() => (page ? setPage(page - 1) : null)}
                className="mr-4 text-paginationButtonColor"
              >
                &#60;
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className=" text-paginationButtonColor"
              >
                &#62;
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
