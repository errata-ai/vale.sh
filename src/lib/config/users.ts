export type UserConfig = {
    name: string;
    source: string;
    website: string;
    info: string;
};

export const userConfigs: UserConfig[] = [
    {
        name: "Amazon Web Services",
        source: "https://github.com/aws/aws-eks-best-practices/blob/master/.vale.ini",
        website: "https://amazon.com/aws",
        info: "Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.",
    },
    {
        name: "Cloudflare",
        source: "https://github.com/cloudflare/cloudflare-docs/blob/production/.vale.ini",
        website: "https://cloudflare.com",
        info: "Cloudflare is a web performance and security company that provides online services to protect and accelerate websites online.",
    },
    {
        name: "Datadog",
        source: "https://github.com/datadog/documentation/blob/master/.vale.ini",
        website: "https://datadog.com",
        info: "Datadog is the essential monitoring and security platform for cloud applications.",
    },
    {
        name: "Docker",
        source: "https://github.com/docker/docs/blob/main/.vale.ini",
        website: "https://docker.com",
        info: "Docker helps developers bring their ideas to life by conquering the complexity of app development.",
    },
    {
        name: "GitLab",
        source: "https://docs.gitlab.com/ee/development/documentation/testing.html#vale",
        website: "https://gitlab.com",
        info: "The most comprehensive AI-powered DevSecOps Platform.",
    },
    {
        name: "Grafana Labs",
        source: "https://github.com/grafana/k6-docs/blob/main/.vale.ini",
        website: "https://grafana.com",
        info: "Grafana Labs is behind leading open source projects Grafana and Loki, and the creator of the first open & composable observability platform.",
    },
    {
        name: "Microsoft",
        source: "https://github.com/microsoft/Documentarian",
        website: "https://microsoft.com",
        info: "Microsoft creates platforms and tools powered by AI to deliver innovative solutions that meet the evolving needs of our customers.",
    },
    {
        name: "Red Hat",
        source: "https://github.com/redhat-documentation/vale-at-red-hat",
        website: "https://redhat.com",
        info: "Red Hat is the leading provider of enterprise open source software solutions.",
    },
    {
        name: "Spectro Cloud",
        source: "https://github.com/spectrocloud/spectro-vale-pkg",
        website: "https://spectrocloud.com",
        info: "From single-cluster to multi-cluster, multi-distro Kubernetes environments, Spectro Cloud takes away all the hassle of lifecycle management, making the complex... simple.",
    }
]
