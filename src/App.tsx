import { useEffect, useState } from "react";
import "./App.css";
import { usePassword } from "./hooks/usePassword";
import { Arrow } from "./icons/Arrow";
import { useValidate } from "./hooks/useValidate";
import { StrengthBar } from "./icons/StrengthBar";

function App() {
  const { validatePassword } = useValidate();
  const [password, setPassword] = useState("P4$5W0rD!");
  const [modifiers, setModifiers] = useState([true, false, false, false]);
  const [length, setLength] = useState(
    modifiers.filter((e) => e === true).length
  );
  const { createPassword } = usePassword();
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const modifiersLength = modifiers.filter((e) => e === true).length;
    if (modifiersLength > length) {
      setLength(modifiersLength);
    } else
      handleRange(length, length, modifiers.filter((e) => e === true).length);
  }, [length, modifiers]);

  useEffect(() => {
    if (password === "P4$5W0rD!") return;
    const newStrength = validatePassword(password);
    newStrength === 0 ? setStrength(1) : setStrength(newStrength);
  }, [password, validatePassword]);

  function handleRange(newLength: number, value: number, minimum: number) {
    setLength(newLength);
    const percentage = ((value - minimum) / (20 - minimum)) * 100;
    document.documentElement.style.setProperty("--value", `${percentage}%`);
  }

  function newPassword() {
    setPassword(() => {
      const newPassword = createPassword(
        modifiers[0],
        modifiers[1],
        modifiers[2],
        modifiers[3],
        length
      );
      return newPassword;
    });
  }

  return (
    <>
      <p className="text-[#817D92] text-[12px]/[21px] md:text-[18px]/[32px] font-semibold ">
        Генератор паролей
      </p>
      <div className="w-[343px] h-[503px] m-4 grid gap-4 md:gap-6 text-[18px]/[23px] text-[#E6E5EA] md:w-[540px] md:h-[645px] ">
        <section className="bg-[#24232C] w-full h-16 md:h-20 grid items-center grid-cols-2 p-4 md:px-8">
          <p
            className={`${
              password === "P4$5W0rD!" ? "text-[#54535B]" : "text-[#E6E5EA]"
            } bg-transparent font-semibold leading-8 justify-self-start text-[18px] text-[24px]/[31px] md:text-[32px]/[43px]`}
          >
            {password}
          </p>
          <svg
            width="21"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer justify-self-end fill-[#A4FFAF] hover:fill-white"
            onClick={() =>
              password !== "P4$5W0rD!"
                ? navigator.clipboard.writeText(password)
                : ""
            }
          >
            <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" />
          </svg>
        </section>
        <main className="bg-[#24232C] w-full h-[423px] p-4 md:p-8 grid md:h-[528px] gap-8 ">
          <section className="grid h-[67px] md:h-[76px] ">
            <p className="col-start-1 text-start text-[12px]/[21px] md:text-[16px]/[24px] ">
              Длина
            </p>
            <p className="col-start-2 text-end text-[18px]/[32px] md:text-[24px]/[42px] text-[#A4FFAF] font-bold ">
              {length}
            </p>
            <input
              className="w-full accent-[#A4FFAF] border-none row-start-2 col-span-2"
              type="range"
              min={modifiers.filter((e) => e === true).length}
              defaultValue={1}
              max={20}
              onChange={(e) =>
                handleRange(
                  Number(e.target.value),
                  Number(e.target.value),
                  modifiers.filter((e) => e === true).length
                )
              }
              id=""
            />
          </section>
          <div className="grid gap-y-4 text-[16px]/[21px] md:leading-6 ">
            <label
              className="col-start-1 col-end-5 text-start gap-5 md:gap-6 items-center h-5 md:h-6 
            inline-flex cursor-pointer"
              htmlFor="uppercase"
            >
              <input
                className="hidden peer/upper"
                type="checkbox"
                name="x"
                id="uppercase"
                onChange={() =>
                  setModifiers((prev) => [!prev[0], ...prev.slice(1)])
                }
                checked={modifiers[0]}
              />
              <span
                className="w-5 h-5 bg-transparent border-2 border-solid border-white flex items-center justify-center
              relative peer-checked/upper:border-none peer-checked/upper:bg-[#A4FFAF]"
              >
                <svg
                  className={`${modifiers[0] ? "" : "hidden"}`}
                  width="14"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="#18171F"
                    stroke-width="3"
                    fill="none"
                    d="M1 5.607 4.393 9l8-8"
                  />
                </svg>
              </span>
              Заглавные буквы
            </label>
            <label
              className="col-start-1 col-end-5 text-start gap-5 md:gap-6 items-center h-5 md:h-6 
            inline-flex cursor-pointer"
              htmlFor="lowercase"
            >
              <input
                className="hidden peer/lower"
                type="checkbox"
                name="x"
                id="lowercase"
                onChange={() =>
                  setModifiers((prev) => [prev[0], !prev[1], ...prev.slice(2)])
                }
                checked={modifiers[1]}
              />
              <span
                className="w-5 h-5 bg-transparent border-2 border-solid border-white flex items-center justify-center
              relative peer-checked/lower:border-none peer-checked/lower:bg-[#A4FFAF]"
              >
                <svg
                  className={`${modifiers[1] ? "" : "hidden"}`}
                  width="14"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="#18171F"
                    stroke-width="3"
                    fill="none"
                    d="M1 5.607 4.393 9l8-8"
                  />
                </svg>
              </span>
              Строчные буквы
            </label>
            <label
              className="col-start-1 col-end-5 text-start gap-5 md:gap-6 items-center h-5 md:h-6 
            inline-flex cursor-pointer"
              htmlFor="number"
            >
              <input
                className="hidden peer/number"
                type="checkbox"
                name="x"
                id="number"
                onChange={() =>
                  setModifiers((prev) => [
                    ...prev.slice(0, 2),
                    !prev[2],
                    prev[3],
                  ])
                }
                checked={modifiers[2]}
              />
              <span
                className="w-5 h-5 bg-transparent border-2 border-solid border-white flex items-center justify-center
              relative peer-checked/number:border-none peer-checked/number:bg-[#A4FFAF]"
              >
                <svg
                  className={`${modifiers[2] ? "" : "hidden"}`}
                  width="14"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="#18171F"
                    stroke-width="3"
                    fill="none"
                    d="M1 5.607 4.393 9l8-8"
                  />
                </svg>
              </span>
              Цифры
            </label>
            <label
              className="col-start-1 col-end-5 text-start gap-5 md:gap-6 items-center h-5 md:h-6 
            inline-flex cursor-pointer"
              htmlFor="symbol"
            >
              <input
                className="hidden peer/symbol"
                type="checkbox"
                name="x"
                id="symbol"
                onChange={() =>
                  setModifiers((prev) => [...prev.slice(0, 3), !prev[3]])
                }
                checked={modifiers[3]}
              />
              <span
                className="w-5 h-5 bg-transparent border-2 border-solid border-white flex items-center justify-center
              relative peer-checked/symbol:border-none peer-checked/symbol:bg-[#A4FFAF]"
              >
                <svg
                  className={`${modifiers[3] ? "" : "hidden"}`}
                  width="14"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="#18171F"
                    stroke-width="3"
                    fill="none"
                    d="M1 5.607 4.393 9l8-8"
                  />
                </svg>
              </span>
              символы
            </label>
          </div>
          <section className="bg-[#18171F] px-4 grid items-center h-[56px] md:h-[72px] font-bold self-end ">
            <p className="text-[#817D92] text-start col-start-1">Левел</p>
            <div className="gap-4 flex justify-self-end items-center col-start-2">
              <p className="text-[#E6E5EA] text-start text-nowrap">
                {strength >= 4
                  ? "Надежный"
                  : strength === 1 || strength < 0
                  ? "Очень легкий"
                  : strength === 2
                  ? "Легкий"
                  : strength === 3
                  ? "Средняк"
                  : ""}
              </p>
              <div className="flex gap-2 items-center">
                <StrengthBar strength={strength} />
                <StrengthBar strength={strength - 1 < 1 ? 0 : strength} />
                <StrengthBar strength={strength - 1 < 2 ? 0 : strength} />
                <StrengthBar strength={strength - 1 < 3 ? 0 : strength} />
              </div>
            </div>
          </section>
          <button
            className="w-full h-[56px] md:h-[65px] gap-4 md:gap-6 bg-[#A4FFAF] hover:bg-transparent hover:border-[2px] hover:border-[#A4FFAF] hover:text-[#A4FFAF] fill-[#24232C] hover:fill-[#A4FFAF] 
          flex justify-center items-center text-black self-end"
            onClick={() =>
              modifiers.filter((e) => e === true).length !== 0
                ? newPassword()
                : ""
            }
          >
            Сгенерировать <Arrow />
          </button>
        </main>
      </div>
    </>
  );
}

export default App;
