import React, { useEffect, useId, useMemo, useState } from 'react';
import './PostCreate.css';
import TextArea from '../components/common/TextArea';
import LazyImg from '../components/common/LazyImg';
import FileInput from '../components/common/FileInput';
import { useForm } from 'react-hook-form';
import { usePostDispatch } from '../context/PostContext';
import { uploadImage } from '../plugins/uploadImage';
import Overlay from '../components/common/Overlay';
import { useNavigate } from 'react-router-dom';
import noImage from './../assets/images/post-img/no-image-available.png';

/**
 * Description
 * @param {{value:boolean,progress:number}} props
 * @returns {JSX.Element}
 */
function PostCreateUploadLoading({ value, progress }) {
  return (
    <>
      <Overlay value={value}>
        <h1 className="text-6xl text-white">Storing Data...</h1>
        <div className="relative h-[30px] w-[402px] mt-2 bg-slate-blue">
          <div
            className="absolute h-full bg-white"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </Overlay>
    </>
  );
}

function PostCreate() {
  const id = useId();
  const form = useForm();
  const postDispatch = usePostDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [progress, setProgress] = useState(0);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = form;

  const [watchTitle, watchText, watchImage] = watch(['title', 'text', 'image']);

  const imgSrc = useMemo(() => {
    clearErrors('image');
    if (!watchImage) return '';
    const file = watchImage[0];
    if (!file) return '';
    const src = URL.createObjectURL(file);
    return src;
  }, [watchImage]);

  const titleId = `title-${id}`;
  const textId = `text-${id}`;
  const fileId = `file-${id}`;

  const isDisabledSubmit = !watchTitle || !watchText || !watchImage?.[0];
  const inputTextColor = isDisabledSubmit
    ? 'text-slate-blue'
    : 'text-dark-midnight-blue';

  const onSubmitHandler = async data => {
    try {
      setLoading(true);
      const imageFile = data.image?.[0];
      if (!imageFile) throw new Error('no image');
      const { fileUrl } = await uploadImage.uploadFile(imageFile, {
        onProgress: ({ progress }) => setProgress(progress),
      });
      const payload = {
        title: data.title,
        text: data.text,
        image: fileUrl,
      };
      postDispatch({ type: 'store', payload });
      navigate('/');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PostCreate">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <PostCreateUploadLoading value={loading} progress={progress} />
        <h1 className="title mb-[40px] md:mb-[50px]">New Post</h1>
        <section className="flex flex-col-reverse md:flex-row justify-between">
          <div className="w-full md:w-[590px]">
            <div className="flex flex-col gap-[20px] md:gap-[40px]">
              <TextArea
                id={titleId}
                label="Add title*"
                errorMessage={errors.title?.message}
                className={`title-textarea ${inputTextColor}`}
                {...register('title', { required: 'title is required!!!' })}
              ></TextArea>
              <TextArea
                id={textId}
                label="Add text*"
                errorMessage={errors.text?.message}
                className={`text-textarea ${inputTextColor}`}
                {...register('text', { required: 'text is required!!1' })}
              ></TextArea>
              <div>
                <button
                  disabled={isDisabledSubmit}
                  type="submit"
                  className="btn-rect btn-active w-autopx-[36px]"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-error">{errors.image?.message}</p>
            <div
              className={`upload-img ${
                imgSrc && 'loaded-img'
              } rounded-[10px] overflow-hidden`}
            >
              {imgSrc ? (
                <LazyImg
                  src={imgSrc}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              ) : (
                <img
                  src={noImage}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt=""
                />
              )}
              <div className="img-btn">
                <div className="tint"></div>
                <FileInput
                  id={fileId}
                  {...register('image', {
                    required: 'image is required!!!',
                    validate(val) {
                      /**@type {File} */
                      const file = val[0];
                      if (!file) return 'no image file selected';
                      if (file.size > 500000)
                        return 'image file too large exceeds 500KB';
                      return true;
                    },
                  })}
                >
                  <span className="text-[24px]">+</span>
                  <span>Add Image</span>
                </FileInput>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default PostCreate;
