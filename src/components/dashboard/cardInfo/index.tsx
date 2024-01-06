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
    <Flex
      bgColor={"#ECEDF3"}
      borderRadius="2rem"
      flexDirection={"column"}
      marginRight={marginRight}
      width={420}
      maxW={420}
      height={700}
      maxH={700}
    >
      <Flex p="6" width="100%" alignItems="center" justifyContent={"center"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Badge bgColor={"yellow.400"} p={"0.5"}>
            <Center>
              <Icon as={title?.icon} w="1.2rem" h="1.2rem" />
            </Center>
          </Badge>
          <Box ml="2" mt="1" as="h4" lineHeight="tight" isTruncated>
            {title?.name}
          </Box>
        </Flex>
        <LinksComponent links={links}/>
      </Flex>
      <InfosComponent inf={inf} />
    </Flex>
  );
}
