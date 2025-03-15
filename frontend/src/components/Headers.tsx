
import { Flex, Box, Image, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, IconButton, Button, Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem } from '@chakra-ui/react';
import { safePolygon, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaUser } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useUser } from './UserProvider';

export interface LinkObj {
    name: string;
    url?: string;
    children?: LinkObj[];
}

export default function Headers(props: { links: LinkObj[] }) {
    const links = props.links;

    const sidebar = useDisclosure();

    const user = useUser();

    function logout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    function menu() {
        if (!user) return;

        const MenuItems = {
            admin: [
                {
                    name: "Quản lí bài viết",
                    link: "/admin/post"
                }
            ],
            gv: [],
            sv: []
        }

        return (
            <>
                <Menu>
                    <MenuButton as={IconButton} icon={<FaUser />}>
                    </MenuButton>
                    <MenuList color={"black"}>
                        <Text textAlign={"center"} fontSize={"medium"} fontWeight={"bold"}>Xin chào, {user.fullname}</Text>
                        <MenuDivider borderColor={'black'} />
                        <MenuGroup>
                            {
                                MenuItems[user.role].map(x => (
                                    <MenuItem >
                                        {x.name}
                                    </MenuItem>
                                ))
                            }
                        </MenuGroup>
                        <MenuDivider borderColor={'black'} />
                        <MenuItem onClick={logout}>
                            Đăng xuất
                        </MenuItem>
                    </MenuList>
                </Menu>
            </>
        )
    }

    return (
        <>
            <Flex alignItems={"center"} justifyContent={"space-between"} bg="linear-gradient(180deg, #0000EC 33%, rgb(0, 102, 255) 100%)" color="white" p={4}>
                <Link to={"/"}>
                    <Flex>
                        <Flex h={61} pl={1}>
                            <Image maxH={"100%"} maxW={"100%"} src='/assets/logo.png' />
                        </Flex>
                        <Flex display={{ md: "flex", base: "none" }}>
                            <Flex w={"2px"} bg={"red"} m={1} borderRadius={100}></Flex>
                            <Flex flexDir={"column"} justifyContent={"center"} pl={2}>
                                <Text as='i' fontSize={"xl"} color={"red.400"} fontWeight={"bold"}>
                                    TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG
                                </Text>
                                <Text as='i' fontSize={"sm"}>
                                    PHUONG DONG UNIVERSITY
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Link>

                <Flex h="100%">
                    {
                        user ? menu() :
                            <>
                                <Link to={"/login"}>
                                    <Button
                                        _hover={{
                                            bg: "blue.400",
                                        }}
                                        size="sm"
                                        color={"white"}
                                        mr={2}
                                        background={"rgba(126, 126, 126, 0.66)"}>

                                        Đăng nhập
                                    </Button>
                                </Link>
                            </>
                    }
                    <IconButton
                        ml={1}
                        bg={"blue.300"}
                        icon={sidebar.isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={sidebar.isOpen ? sidebar.onClose : sidebar.onOpen}
                    />
                </Flex>

            </Flex >
            <Flex pl={5} pr={5} bg={"blue.500"} display={{ md: "flex", base: "none" }}>
                {links.map((link, _) => {
                    if (link.children) {
                        const [isOpen, setIsOpen] = useState(false);

                        async function setProxy(val: boolean) {
                            if (refs.floating.current) {
                                refs.floating.current.style.transition = "opacity 0.2s"
                                refs.floating.current.style.opacity = "0";
                                await new Promise((resolve) => setTimeout(resolve, 200));
                            };
                            setIsOpen(val);
                        }

                        const { refs, floatingStyles, context } = useFloating({
                            open: isOpen,
                            onOpenChange: setProxy,
                            placement: 'bottom-start',
                        });

                        const hover = useHover(context, {
                            handleClose: safePolygon(),
                        });

                        const { getReferenceProps } = useInteractions([
                            hover,
                        ]);

                        return (
                            <React.Fragment key={link.name}>
                                <Flex ref={refs.setReference} {...getReferenceProps()} _hover={{
                                    bg: "blue.300",
                                    color: "white",
                                }} m={1} p={1} borderRadius={4} fontSize={"large"} color={"white"}>{link.name}</Flex>
                                {isOpen && (
                                    <>
                                        <Box borderBottomRadius={10} mt={1} bg="rgba(213, 213, 213, 0.54)" backdropFilter={"blur(2px)"} border={"2px solid"} borderTop={"none"} p={1} ref={refs.setFloating} style={floatingStyles}>
                                            {link.children.map((child, _) => (
                                                <Link to={child.url || '#'} key={child.name}>
                                                    <Flex p={1} borderRadius={4} _hover={{
                                                        bg: "blue.300",
                                                        color: "white",
                                                    }}>{child.name}</Flex>
                                                </Link>
                                            ))}
                                        </Box>
                                    </>
                                )}
                            </React.Fragment>
                        )
                    }
                    return (
                        <React.Fragment key={link.name}>
                            <Link to={link.url || '#'}>
                                <Flex _hover={{
                                    bg: "blue.300",
                                    color: "white",
                                }} pl={2} pr={2} pt={2} pb={2} alignContent={"center"} fontSize={"large"} color={"white"}>{link.name}</Flex>
                            </Link>
                        </React.Fragment>
                    )
                })}
            </Flex>


            <Drawer isOpen={sidebar.isOpen} placement="right" size={"full"} onClose={sidebar.onClose}>
                <DrawerOverlay />

                <DrawerContent background={"rgba(255, 255, 255, 0.71)"} backdropFilter={"blur(10px)"}>
                    <DrawerCloseButton />

                    <DrawerHeader display={"flex"}>
                        Menu
                    </DrawerHeader>

                    <DrawerBody paddingInlineEnd={4} paddingInlineStart={4}>
                        {links.map((link, _) => {
                            if (link.children) {
                                const menu = useDisclosure();
                                return (
                                    <React.Fragment key={link.name}>
                                        <Flex p={2} width={"100%"} onClick={menu.isOpen ? menu.onClose : menu.onOpen} justifyContent={"space-between"} fontSize={"large"}>
                                            <Flex>{link.name}</Flex>
                                            {menu.isOpen ? <ChevronDownIcon boxSize={6} /> : <ChevronRightIcon boxSize={6} />}
                                        </Flex>
                                        <Box borderLeft={"1px solid rgb(32, 32, 32)"} display={menu.isOpen ? "block" : "none"} fontSize={"large"} ml={3} pl={1}>
                                            {link.children.map((child, _) => (
                                                <Link to={child.url || '#'} key={child.name}>
                                                    <Flex p={1}>{child.name}</Flex>
                                                </Link>
                                            ))}
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                            return (
                                <Link to={link.url || '#'}>
                                    <Flex p={2} fontSize={"large"}>{link.name}</Flex>
                                </Link>
                            )
                        })}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}