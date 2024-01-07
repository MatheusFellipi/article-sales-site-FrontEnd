import { Badge, Box, Center, Flex, Icon } from "@chakra-ui/react";
import {
  InfoType,
  LinksType,
  TitleType,
} from "../../../types/components/cardInfo";
import { InfosComponent } from "./infos";
import { LinksComponent } from "./links";

interface Props {
  title: TitleType;
  inf: InfoType[];
  links: LinksType[];
  marginRight?: string | number;
}

export function CardDashInfoComponent({
  title,
  inf,
  links,
  marginRight,
}: Readonly<Props>) {
  return (
    <Box
      bgColor={"#ECEDF3"}
      mb={{ sm: "5rem", }}
      pb={{sm:"2rem"}}
      borderRadius="2rem"
      marginRight={marginRight}
    >
      <Flex p="6" width="100%">
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Badge bgColor={"yellow.400"} p={"0.5"}>
            <Center>
              <Icon as={title?.icon} w="1.5rem" h="1.5rem" />
            </Center>
          </Badge>
          <Box ml="2" mt="1" as="h4" lineHeight="tight" isTruncated>
            {title?.name}
          </Box>
        </Flex>
        <LinksComponent links={links} />
      </Flex>
      <InfosComponent inf={inf} />
    </Box>
  );
}
