"use client";

import React, { useMemo } from "react";
import { Modal } from "./Modal";
import { useRentModal } from "@/app/hooks/useRentModal";
import { Heading } from "../Headings/Heading";
import { CategoryArray } from "../Category/Categories";
import { CategoryInput } from "../Category/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Counter, CountrySelect, ImageUpload, NavInput } from "../Inputs";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const RentModalHook = useRentModal();
  const router = useRouter();

  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const ActionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    } else {
      return "Next";
    }
  }, [step]);

  const SecondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY || step === STEPS.PRICE) {
      return undefined;
    } else {
      return "Previous";
    }
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      Category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

      if (step !== STEPS.PRICE) {
        return onNext();
      }
      setIsLoading(true);
      axios
        .post("api/listings", data)
        .then(() => {
          toast.success("Listing Created!");
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          RentModalHook.onClose();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Maps/Map"), {
        ssr: false,
      }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these describes your place "
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {CategoryArray.map((Category) => (
          <div className="col-span-1" key={Category.label}>
            <CategoryInput
              onClick={(value) => {
                setCustomValue("category", value);
              }}
              label={Category.label}
              icon={Category.icon}
              selected={category === Category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is you place location"
          subTitle="Help guests find you"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    body = (
      <div className="flex gap-8 flex-col">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have"
        />

        <Counter
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subTitle="How many guests do you allow"
        />

        <Counter
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
          title="Rooms"
          subTitle="How many rooms do you have"
        />

        <Counter
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
          title="Bahtroom"
          subTitle="How many bathrooms do you have"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />

        <ImageUpload
          onChange={(value: string) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subTitle="Short and sweet works best"
        />

        <NavInput
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <NavInput
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night"
        />

        <NavInput
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={RentModalHook.isOpen}
      onClose={RentModalHook.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={ActionLabel}
      secondaryLabel={SecondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={body}
      disabled={isLoading}
    />
  );
};
