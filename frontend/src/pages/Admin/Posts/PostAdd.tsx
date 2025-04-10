import { Box, Button, Flex, Input, Text, Image, IconButton, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import MarkdownRender from "../../../components/MarkdownRender";
import Editor from '@monaco-editor/react';
// @ts-ignore
import Files from 'react-files';
import "./../../../styles/postAdd.css";

import CreatableSelect from 'react-select/creatable';
import { getToken } from "../../../utils/Helper";
import { editor } from "monaco-editor";
import { CloseIcon } from "@chakra-ui/icons";

interface FileObj {
    fileId: string;
    fileName: string;
    filePath: string;
    isDefault?: boolean;
}

export default function PostAdd() {

    const [fullPrevew , setFullPrevew] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [postId, _] = useState<string>(uuidv4());
    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState<FileObj[]>([]);
    const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
    const [allTags, setAllTags] = useState<{ value: string, label: string }[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/post/getTags")
            .then(res => res.json())
            .then(data => {
                setAllTags(data.map((tag: string) => ({ value: tag, label: tag })));
            });
    }, []);

    function handleFilesChange(filesIn: File[]) {
        const token = getToken();
        if (!token) return alert("Bạn cần đăng nhập để upload ảnh");

        const formData = new FormData();
        formData.append("postId", postId);
        filesIn.forEach(file => formData.append(file.name, file));
        fetch("/api/post/file_upload", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(data => {
                let fileString = "";
                for (const file of data["fileIds"]) {
                    fileString += `\n![${file.fileName}](/cdn/${file.filePath})`;
                }
                editor?.setValue(content + fileString);
                setFiles([...files, ...data["fileIds"]]);
            });
    }

    function deleteFile(fileId: FileObj) {
        const token = getToken();
        if (!token) return alert("Bạn cần đăng nhập để upload ảnh");
        fetch("/api/post/file_delete", {
            method: "POST",
            body: JSON.stringify({ fileId: fileId.fileId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => {
                if (!res.ok) return alert("Xóa ảnh không thành công");
                setFiles(files.filter(file => file.fileId !== fileId.fileId));
                editor?.setValue(
                    content
                        .replace(
                            new RegExp(`!\\[.*?\\]\\(/cdn/${fileId.filePath}\\)`, "g"),
                            ""
                        )
                        .replace(
                            new RegExp(`<img[^>]*src=["'](/cdn/${fileId.filePath})["'][^>]*>`, "g"),
                            ""
                        )
                );
            })
    }

    function savePost() {
        const token = getToken();
        if (!token) return alert("Bạn cần đăng nhập để đăng bài");
        if (!title?.trim()) return alert("Bạn chưa nhập tiêu đề");
        if (!content.trim()) return alert("Bạn chưa nhập nội dung");
        const body: Record<string, any> = {};
        body["title"] = title;
        body["content"] = content;
        body["fileIds"] = files;
        body["tags"] = tags;
        fetch("/api/post/new", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(data => {
                alert("Đăng bài thành công");
                window.location.href = `/post/${data["slug"]}`;
            });
    }

    useEffect(() => {
        if (fullPrevew) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [fullPrevew]);


    return (
        <Flex p={6} direction="column" w="100%">
            <Text fontSize={"larger"}>Tiêu đề bài viết</Text>
            <Input onChange={event => setTitle(event.target.value)} borderColor={"black"} placeholder="Tiêu đề bài viết" />
            <Flex direction={{ base: "column", md: "row" }} w="100%" gap={1}>
                <Flex flexDir="column" w={{ base: "100%", md: "50%" }} h={"80vh"} mt={4}>
                    <Text fontSize={"larger"} mt={4}>Nội dung bài viết</Text>
                    <Editor
                        onMount={
                            (editor) => {
                                setEditor(editor);
                                editor.focus();
                            }
                        }
                        theme="vs-light"
                        height="100%"
                        defaultLanguage={"markdown"}
                        defaultValue={content}
                        onChange={(value) => setContent(value || "")}
                    />
                </Flex>
                <Flex flexDir="column" overflow={"hidden"} w={{ base: "100%", md: "50%" }} h={"80vh"} mt={4}>
                    <Flex w={"100%"} justify={"space-between"}>
                        <Text fontSize={"larger"} mt={4}>Xem trước</Text>
                        <Button onClick={() => setFullPrevew(true)} ml={2}>
                            Phóng to
                        </Button>
                    </Flex>
                    {!fullPrevew ? (
                        <Box p={5} height={"100%"} bg="#F2E2B1" w="100%" overflow="auto">
                            <Text fontSize={"xx-large"} m={0} p={0}>{title}</Text>
                            <Box w="100%" mb={7} mt={3} bg={"black"} h={1} borderRadius={12}></Box>
                            <MarkdownRender>
                                {content}
                            </MarkdownRender>
                        </Box>
                    ) : (
                        <Box 
                            position="fixed"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            zIndex={999}
                            bg="#F2E2B1"
                            p={8}
                            overflow="auto"
                        >
                            <Button 
                                position="absolute" 
                                top={4} 
                                right={4} 
                                onClick={() => setFullPrevew(false)}
                            >
                                Thu gọn
                            </Button>
                            <Text fontSize={"xx-large"} m={0} p={0} mt={10}>{title}</Text>
                            <Box w="100%" mb={7} mt={3} bg={"black"} h={1} borderRadius={12}></Box>
                            <MarkdownRender>
                                {content}
                            </MarkdownRender>
                        </Box>
                    )}
                </Flex>
            </Flex>
            <Box>
                <Text fontSize={"larger"} mt={4}>Tags cho bài viết</Text>
                <CreatableSelect
                    onChange={(tags) => setTags(tags.map(tag => tag.value))}
                    isMulti
                    name="Tags"
                    options={allTags}
                />
            </Box>
            <Box>
                <Text fontSize={"larger"} mt={4}>Ảnh cho bài viết</Text>
                <Box h={"10vh"}>
                    <Files
                        onChange={handleFilesChange}
                        onError={(err: any) => console.log(err)}
                        className='files-dropzone'
                        accepts={['image/*']}
                        multiple
                        clickable>
                        <Flex bg={""} direction="column" align="center" justify="center" h="100%">
                            <Text>Thả ảnh vào đây hoặc click để chọn ảnh</Text>
                        </Flex>
                    </Files>
                </Box>
                {files.length > 0 && <>
                    <Text fontSize={"larger"} mt={4}>Ảnh đã tải lên</Text>
                    <Text>* Click vào ô ở dưới ảnh để chọn ảnh mặc định hiển thị trên trang chính</Text>
                    <Box overflow="auto" mt={3}>
                        <Flex direction="row" display={"inline-flex"}>
                            {files.map((file) => (
                                <Box key={file.fileId} position="relative" boxSize="100px">
                                    <IconButton
                                        aria-label="Close"
                                        icon={<CloseIcon />}
                                        size="sm"
                                        position="absolute"
                                        top="2"
                                        right="2"
                                        onClick={() => deleteFile(file)} />
                                    <Flex
                                        position="absolute"
                                        bottom="2"
                                        left="2"
                                        bg="white"
                                        borderRadius="md"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Checkbox
                                            type="checkbox"
                                            isChecked={file.isDefault === true}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                const updatedFiles = files.map(f => ({
                                                    ...f,
                                                    isDefault: f.fileId === file.fileId && isChecked ? true : false
                                                }));
                                                setFiles(updatedFiles);
                                            }} />
                                    </Flex>
                                    <Image
                                        src={`/cdn/${file.filePath}`}
                                        alt={file.fileName}
                                        boxSize="100%"
                                        objectFit="contain" />
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </>
                }
            </Box>
            <Button onClick={savePost} mt={4}>Lưu</Button>
        </Flex>
    );
}