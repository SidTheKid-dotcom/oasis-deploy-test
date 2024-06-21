import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmojiPicker from 'emoji-picker-react';
import GifPicker from "gif-picker-react";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

export default function ReplyCommentBox({ parent_id, comments, setComments }) {
    const [comment, setComment] = useState('');
    const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);
    const [displayGifPicker, setDisplayGifPicker] = useState(false);
    const [gifURL, setGifURL] = useState(null);
    const emojiPickerRef = useRef(null);
    const gifPickerRef = useRef(null);
    const { token } = useAuth();

    const handlePostComment = async () => {
        try {
            if(comment.length === 0 && gifURL === null) {
                alert('Comment cannot be empty');
                return;
            }
            const response = await axios.post('https://oasis-api.xyz/api/post/childComment', {
                parent_id: parent_id,
                comment: comment,
                gifURL: gifURL
            },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

            if (response.status === 200) {
                setComments(prevComments => {
                    const updatedComments = prevComments.map(comment => {
                        if (comment.id === parent_id) {
                            return {
                                ...comment,
                                child_comments: [response.data.childComment, ...comment.child_comments]
                            };
                        }
                        return comment;
                    });
                    return updatedComments;
                });

                setComment('');
                setGifURL(null);
                toast('Comment Posted Successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-green-400 placeholder-font-pixel-text open-sans',
                });
            }
        } catch (error) {
            console.log('error in posting comment: ', error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setDisplayEmojiPicker(false);
            }
            if (gifPickerRef.current && !gifPickerRef.current.contains(event.target)) {
                setDisplayGifPicker(false);
                gifPickerRef.current.blur();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleEmojiClick = (e) => {
        setComment(prev => prev + e.emoji);
    };

    const handleGifClick = (gif) => {
        setGifURL(gif.url);
        setComment('');
    };

    const handleRemoveGif = () => {
        setGifURL(null);
    };

    return (
        <div>
            {displayEmojiPicker && (
                <div ref={emojiPickerRef} className={`fixed z-50 ${window.innerWidth < 640 ? 'bottom-[-40px] left-1/2 transform -translate-x-1/2' : 'top-1/3 left-1/4'}`}>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        emojiStyle="native"
                        width="300px"
                        height="400px"
                        onBlur={() => setDisplayEmojiPicker(false)}
                    />
                </div>
            )}
            {displayGifPicker && (
                <div ref={gifPickerRef} className={`fixed z-50 ${window.innerWidth < 640 ? 'bottom-[-100px] left-1/2 transform -translate-x-1/2' : 'top-1/3 left-1/4'}`}>
                    <GifPicker
                        tenorApiKey={"AIzaSyB8irh6rYLNBmiOzVOiBkd8OPOpgdXVd_s"}
                        onGifClick={handleGifClick}
                        onBlur={() => {
                            setDisplayGifPicker(false);
                            gifPickerRef.current.blur();
                        }}
                    />
                </div>
            )}
            <div className="grid grid-cols-12 w-full gap-2 relative">
                <button
                    onClick={() => setDisplayEmojiPicker(true)}
                    className="col-span-1 flex flex-col items-center mt-[10px] h-[30px]"
                >
                    ㋛
                </button>
                <button
                    onClick={() => setDisplayGifPicker(true)}
                    className="col-span-1 flex flex-col items-center mt-[10px] h-[30px]"
                >
                    GIF
                </button>
                <div className="col-span-8 rounded-[15px] text-black">
                    {gifURL ? (
                        <div>
                            <img src={gifURL} className="w-full h-full" />
                        </div>
                    ) : (
                        <textarea
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => handleChange(e)}
                            className="placeholder-font-pixel-text open-sans bg-white w-full overflow-auto outline-none p-2 rounded-[10px] max-h-[200px]"
                            rows="50"
                            style={{ height: `${comment.split('\n').length * 20 + 20}px` }}
                        />
                    )}
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                    <button onClick={handlePostComment} className="p-2 bg-blue-500 rounded-[15px] max-h-[40px] flex flex-col items-center justify-center">
                        <img src='/paper-plane-solid.svg' width='15px'></img>
                    </button>
                    {gifURL && (
                        <button onClick={handleRemoveGif} className="bg-red-400 p-2 rounded-[15px] max-h-[40px] flex flex-col items-center justify-center">
                            <img src='/trash-solid.svg' width='15px'></img>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
