"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorMessage } from "@hookform/error-message";
import Styles from "../styles/contactme.module.scss";
import { notification } from "antd";

export default function ContactForm() {
  type FormValues = {
    name: String;
    email: String;
    phone: String;
    message: String;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  async function onSubmitForm(values: any) {
    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        reset();
        notification["success"]({
          message: "Message has been successfully send ",
          // description:
          //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        });
      }
    } catch (err) {
      console.log(err, "erorr");
      notification["error"]({
        message: "Can't send the message something went wrong",
        description: err as any,
      });
    }
  }

  return (
    <div className={Styles.contactForm}>
      <div className={Styles.ContactFormCard}>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className={Styles.ContactFormCardForm}
        >
          <div className={Styles.ContactFormCardContent}>
            <div className={Styles.ContactFormCardLeft}>
              <div className={errors.name ? "mb-0" : "mb-4"}>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "This is required",
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? "ring-2 ring-red-500" : null
                  }`}
                  placeholder="Full name"
                />

                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <span className="text-red-400 text-sm py-2">{message}</span>
                  )}
                />
              </div>
              <div className={errors.email ? "mb-0" : "mb-4"}>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="text"
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? "ring-2 ring-red-500" : null
                  }`}
                  placeholder="Email"
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <span className="text-red-400 text-sm py-2">{message}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className={Styles.ContactFormCardRight}>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                rows={4}
                {...register("message", { required: "This is required" })}
                className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                  errors.message ? "ring-2 ring-red-500" : null
                }`}
                placeholder="Message"
              ></textarea>
              <ErrorMessage
                errors={errors}
                name="message"
                render={({ message }) => (
                  <span className="text-red-400 text-sm py-2">{message}</span>
                )}
              />
            </div>
          </div>
          <div className={Styles.ContactFormSubmitButton}>
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
