"use client";

import NextImage from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/handle-component";
import { Label } from "@/components/ui/label";
import { RadioGroup, Radio } from "@headlessui/react";
import { useRef, useState } from "react";
import { base64ToBlob, cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
  BASE_PRICE,
} from "@repo/constants";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { useUpload } from "@/hooks/useUpload";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type CustomizePageProps = {
  imageUrl: string;
  id: string;
  imageDimensions: { width: number; height: number };
};

export default function CustomizePage({
  id: orderId,
  imageUrl,
  imageDimensions,
}: CustomizePageProps) {
  const [config, setConfig] = useState({
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
    model: MODELS[0],
    color: COLORS[0],
  });
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null!);
  const caseRef = useRef<HTMLDivElement>(null!);
  const [imagePosition, setImagePosition] = useState({
    x: 140,
    y: 240,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  const { upload, isUploading, progress: uploadProgress } = useUpload();
  async function saveConfig() {
    const canvas = document.createElement("canvas");
    const {
      width,
      height,
      left: caseLeft,
      top: caseTop,
    } = caseRef.current.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      containerRef.current.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const leftOffset = caseLeft - containerLeft;
    const topOffset = caseTop - containerTop;
    const actualX = imagePosition.x - leftOffset;
    const actualY = imagePosition.y - topOffset;
    const ctx = canvas.getContext("2d");
    const userImage = new Image();
    userImage.crossOrigin = "anonymous";
    userImage.src = imageUrl;
    await new Promise((resolve) => (userImage.onload = resolve));
    ctx?.drawImage(
      userImage,
      actualX,
      actualY,
      renderedDimensions.width,
      renderedDimensions.height,
    );
    const url = canvas.toDataURL();
    const blob = await base64ToBlob(url.split(",")[1], "image/png");
    const file = new File([blob], "upload.png");
    try {
      const data = await upload(file);
      setIsSaving(true);
      await apiClient.put(`/orders/${orderId}`, {
        customizedUrl: data.secure_url,
        material: config.material.value,
        finish: config.finish.value,
        color: config.color.value,
        model: config.model.value,
      });
      router.push(`/create/preview?id=${orderId}`);
    } catch (e) {
      console.error(e);
      alert("Saving configuration failed");
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-3 relative my-10">
      <div
        className="col-span-2 overflow-hidden border-dashed border-2 flex flex-col items-center justify-center rounded-lg border-black/20 relative p-10 h-[30rem] box-content"
        ref={containerRef}
      >
        <div className="w-60 mx-auto relative flex-grow bg-purple-100">
          <AspectRatio
            ratio={1895 / 3837}
            className="pointer-events-none relative z-50 aspect-[1895/3837] w-full"
            ref={caseRef}
          >
            <NextImage
              src={"/phone-frame.png"}
              alt="Phone"
              fill
              className="z-50"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] pointer-events-none" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px",
            )}
            style={{ backgroundColor: config.color.color }}
          />
        </div>

        <Rnd
          lockAspectRatio
          default={{
            x: 112,
            y: 220,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResize={(_, __, ref, ____, pos) => {
            setRenderedDimensions({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
            setImagePosition(pos);
          }}
          onDragStop={(_, data) => {
            setImagePosition({ x: data.x, y: data.y });
          }}
          resizeHandleComponent={{
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
          className="absolute z-20 border-primary border-2"
        >
          <div className="relative w-full h-full">
            <NextImage alt="your image" src={imageUrl} fill />
          </div>
        </Rnd>
      </div>
      <div className="bg-white rounded-r-lg p-4 h-[35.2rem] overflow-auto pt-10 border border-border">
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await saveConfig();
          }}
        >
          <h4 className="text-3xl font-semibold">Customize Your Case</h4>
          <hr />
          <div className="flex flex-col gap-2">
            <Label className="capitalize">Color: {config.color.name}</Label>
            <RadioGroup
              value={config.color}
              onChange={(color) =>
                setConfig((c) => {
                  return { ...c, color };
                })
              }
              className="flex gap-2"
            >
              {COLORS.map((color) => (
                <Radio
                  key={color.value}
                  value={color}
                  style={{ backgroundColor: color.color }}
                  className={cn(
                    "block rounded-full w-6 h-6 p-1",
                    color == config.color &&
                      "border-2 border-white ring-primary ring-2",
                  )}
                />
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Model</Label>
            <Select defaultValue="samsung_s24">
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="samsung_s24">Samsung S24</SelectItem>
                  <SelectLabel>More coming soon</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {[MATERIALS, FINISHES].map(({ name, options }) => (
            <div className="flex flex-col gap-2" key={name}>
              <Label className="capitalize">{name}</Label>
              <RadioGroup
                value={config.color}
                onChange={(value) =>
                  setConfig((c) => {
                    return { ...c, [name]: value };
                  })
                }
                className="flex flex-col gap-2"
              >
                {options.map((option) => (
                  <Radio
                    key={name + ":" + option.value}
                    value={option}
                    className={cn(
                      "flex justify-between p-4 border border-border cursor-pointer select-none rounded-lg",
                      option == config[name] && "ring-primary ring-2",
                    )}
                  >
                    <span>{option.name}</span>
                    {option.price > 0 && (
                      <span>
                        {option.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          ))}
          <div className="flex items-center justify-between bg-white py-4 border-t border-border gap-10">
            <span className="text-2xl">
              {(
                BASE_PRICE +
                config.material.price +
                config.finish.price
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <Button
              className="flex-grow"
              type="submit"
              disabled={isUploading || isSaving}
            >
              <span>
                {isUploading ? "Uploading" : isSaving ? "Saving" : "Continue"}
              </span>
              {(isUploading || isSaving) && (
                <Loader2 className="animate-spin w-6 h-6" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
