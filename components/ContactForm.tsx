import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmitForm(values: any) {
    setIsSubmitting(true);
    
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
          message: "Message has been successfully sent",
        });
      }
    } catch (err) {
      console.log(err, "error");
      
      // Extract meaningful error message
      let errorMessage = "Please try again later";
      
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        // API returned a specific error message
        errorMessage = err.response.data.error;
      } else if (err instanceof Error) {
        // General error with message
        errorMessage = err.message;
      }
      
      notification["error"]({
        message: "Can't send the message, something went wrong",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
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
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  className={errors.name ? "ring-2" : ""}
                  placeholder="Full name"
                />

                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <span>{message}</span>}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="text"
                  className={errors.email ? "ring-2" : ""}
                  placeholder="Email"
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <span>{message}</span>}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className={Styles.ContactFormCardRight}>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                {...register("message", { required: "Please enter a message" })}
                className={errors.message ? "ring-2" : ""}
                placeholder="Message"
              ></textarea>
              <ErrorMessage
                errors={errors}
                name="message"
                render={({ message }) => <span>{message}</span>}
              />
            </div>
          </div>
          <div className={Styles.ContactFormSubmitButton}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
