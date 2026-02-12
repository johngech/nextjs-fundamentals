import {
  Html,
  Head,
  Body,
  Button,
  Container,
  Text,
  Link,
  Section,
  Tailwind,
  Row,
  Column,
  pixelBasedPreset,
} from "@react-email/components";
import { CSSProperties } from "react";

interface Props {
  firstName: string;
}

const WelcomeTemplate = ({ firstName }: Props) => {
  return (
    <Html>
      <Head className="text-blue-300 text-center text-2xl">
        Welcome aboard!
      </Head>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Body className="bg-white">
          <Container>
            <Section>
              <Text className="text-blue-950">Hello {firstName}!</Text>
            </Section>
            <Section>
              <Text className="text-blue-950">Test email</Text>
            </Section>
            <Section>
              <Link href="https://google.com">Google</Link>

              <Link href="https://facebook.com">Facebook</Link>
            </Section>
            <Section>
              <Row>
                <Column>Column 1, Row 1</Column>
                <Column>Column 2, Row 1</Column>
              </Row>
              <Row>
                <Column>Column 1, Row 2</Column>
                <Column>Column 2, Row 2</Column>
              </Row>
            </Section>
            <Section>
              <Button className="bg-brand px-3 py-2 font-medium leading-4 text-white">
                Click Me
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const bodyStyle: CSSProperties = {
  background: "#fff",
};
const buttonStyle: CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "10px",
};

export default WelcomeTemplate;
