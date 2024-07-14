import { FormEvent } from "react"

interface props {
    submitHandler: (event: FormEvent<HTMLFormElement>) => void
    AlreadySigned: () => void
}

const RegisterForm: React.FC<props> = ({submitHandler, AlreadySigned}) => {
    return (
        <form
        onSubmit={submitHandler}
        className="h-[75vh] w-[80%] md:w-1/2 xl:w-[40%] flex flex-col justify-center items-center border border-gray-500/20 p-3 rounded-lg shadow-2xl bg-transparent backdrop-blur-lg"
      >
        <div className="py-3">
          <div className="w-[105px] opacity-100 group-hover:text-yellow-500 transition-opacity relative top-3 left-3 bg-gray-800 px-2">
            <p className="text-red-500">NICKNAME</p>
          </div>
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            required
            className="bg-transparent py-2 px-5 xl:px-10 rounded-3xl focus:ring-2 focus:border-none ring-red-500 border"
          />
        </div>

        <div className="py-3">
          <div className="w-[50px] opacity-100 group-hover:text-yellow-500 transition-opacity relative top-3 left-3 bg-gray-800 px-2">
            <p className="text-red-500">MAIL</p>
          </div>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            className="bg-transparent py-2 px-5 xl:px-10 rounded-3xl focus:ring-2 focus:border-none ring-red-500 border"
          />
        </div>

        <div className="py-3">
          <div className="opacity-100 w-[105px] relative top-3 left-3 bg-gray-800 px-2">
            <p className="text-red-500">PASSWORD</p>
          </div>
          <input
            type='password'
            name='password'
            placeholder="Enter your password"
            required
            className="bg-transparent py-2 px-5 xl:px-10 rounded-3xl focus:ring-2 focus:border-none ring-red-500 border"
          />
        </div>

        <div className="py-3">
          <div className="opacity-100 w-[105px] relative top-3 left-3 bg-gray-800 px-2">
            <p className="text-red-500">PASSWORD</p>
          </div>
          <input
            type='password'
            name='password2'
            placeholder="Confirm your password"
            required
            className="bg-transparent py-2 px-5 xl:px-10 rounded-3xl focus:ring-2 focus:border-none ring-red-500 border"
          />
        </div>

        <button
          type="submit"
          className="m-2 bg-red-400 py-2 px-4 rounded-full"
        >
          Submit
        </button>

        <div className="py-10 flex flex-col">
          <p>Already signed up?</p>
          <button
            onClick={AlreadySigned}
            className=""
          >
            Sign in
          </button>
        </div>
      </form>
    );
}

export default RegisterForm;