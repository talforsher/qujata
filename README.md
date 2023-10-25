<img src="https://github.com/att/qujata/assets/7979328/199a9c84-840b-415e-a221-621c22184ad2" width="300">


# Table of Contents

- [**Overview**](#overview)
- [**Algorithms**](#algorithms)
- [**Getting Started**](#getting-started)
- [**Development**](#development)
- [**Contributing**](#contributing)
- [**Releases**](#releases)
- [**Code of Conduct**](#code-of-conduct)
- [**License**](#license)


# Overview

In recent years, there has been a substantial amount of research on quantum computers – machines that exploit quantum mechanical phenomena to solve mathematical problems that are difficult or intractable for conventional computers. If large-scale quantum computers are ever built, they will be able to break many of the public-key cryptosystems currently in use. This would seriously compromise the confidentiality and integrity of digital communications on the Internet and elsewhere.  The goal of post-quantum cryptography (also called quantum-resistant cryptography) is to develop cryptographic systems that are secure against both quantum and classical computers, and can interoperate with existing communications protocols and networks.

Qujata project (after myth creature Kujata or Quyata) is a testbed, evaluating the performance of the supported Quantum-Safe Crypto protocols by their client & server vital signs, like memory and cpu usage, connection time, download speed, once connection is established, etc.

# Algorithms

### Algorithms supported

This section lists all quantum-safe algorithms supported by this oqs testbed.

As standardization for these algorithms within TLS is not done, all TLS code points/IDs can be changed from their default values to values set by environment variables. This facilitates interoperability testing with TLS1.3 implementations that use different IDs.

<!--- OQS_TEMPLATE_FRAGMENT_IDS_START -->
|Algorithm name | Enabled |  Type
|---------------|----------------------|----------------------|
| bikel1           | Yes     | Post Quantoum |
| bikel3           | Yes     | Post Quantoum |
| bikel5           | Yes     | Post Quantoum |
| frodo1344aes     | Yes     | Post Quantoum |
| frodo1344shake   | Yes     | Post Quantoum |
| frodo640aes      | Yes     | Post Quantoum |
| frodo640shake    | Yes     | Post Quantoum |
| frodo976aes      | Yes     | Post Quantoum |
| frodo976shake    | Yes     | Post Quantoum |
| hqc128           | Yes     | Post Quantoum |
| hqc192           | Yes     | Post Quantoum |
| hqc256           | Yes     | Post Quantoum |
| kyber1024        | Yes     | Post Quantoum |
| kyber512         | Yes     | Post Quantoum |
| kyber768         | Yes     | Post Quantoum |
| p256_kyber512    | Yes     | Hybrid        |
| p384_kyber768    | Yes     | Hybrid        |
| prime256v1       | Yes     | Classic       |
| secp384r1        | Yes     | Classic       |
| x25519_kyber768  | Yes     | Hybrid        |

<!--- OQS_TEMPLATE_FRAGMENT_IDS_END -->

# Getting Started

We suggest using the [Docker Compose](#docker) distribution, but a [Kubernetes Helm](#kubernetes)  charts procedure is avalable if you’d prefer to run the Qujata in your kubernetes environment.

also a [Development Installation](#development) procedure to run the Qujata in development mode is provided.


To start, clone the qujata repository:
```bash
git clone https://github.com/att/qujata.git
cd qujata
```

# Docker
Prerequisit: Docker, Docker Compose. <br>
Docker Compose is included in [Docker Desktop installation](https://www.docker.com/products/docker-desktop/) <br>


1. cd to the following directory:
```bash
cd run/docker
```
2. Start the application using:
```bash
docker compose up
```
3. The grafana ui is now available on the below url:
```bash
http://localhost:3000/
``` 
4. running your test using curl:
```bash
curl http://localhost:3010/curl -H 'Content-Type: application/json'  --data-raw '{"algorithm":"kyber512", "iterationsCount":3000}'
``` 

# Kubernetes 
Prerequisit: [Kubernetes](https://kubernetes.io/releases/download/), [Helm](https://helm.sh/docs/intro/install/) <br>
If you're using Docker Desktop you can  [Enable Kuberenets in Docker Desktop](https://docs.docker.com/desktop/kubernetes/) <br>

1. cd to the following directory:
```bash
cd run/kuberenetes
```
2. install helm charts:
```bash
helm dependency update
helm install -i  qujata –create-namespace qujata --namespace qujata
```
3. to expose grafana and curl you can use both options:

### port forward:<br>
*    expose ports:
```bash
kubectl port-forward service/qujata-grafana 3000:3000 -n qujata
kubectl port-forward service/qujata-curl 3010:3010 -n qujata
```
*    The grafana ui is now available on the below url:
```bash
http://localhost:3000/
``` 
*    running your test using curl:
```bash
curl http://localhost:3010/curl -H 'Content-Type: application/json'  --data-raw '{"algorithm":"kyber512", "iterationsCount":3000}'
``` 

### ingress-controller:<br>
*    install ingress-controller if not installed yet
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --create-namespace --namespace ingress-nginx
```
*    The grafana ui is now available on the below url:
```bash
http://localhost/grafana
``` 
*    running your test using curl:
```bash
curl http://localhost/curl -H 'Content-Type: application/json'  --data-raw '{"algorithm":"kyber512", "iterationsCount":3000}'
``` 


# Development


# Contributing

Information about how to contribute, can be found [here](CONTRIBUTING.md).

# Releases

Please note, for more details about releases, a Changelog file will be available soon.


# Acknowledgements

Qujata project is based on [Open Quantum Safe](https://github.com/open-quantum-safe) project and other work done by [NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) and other organization and individuals, working on PQC (Post Quantum Safe) cryptography algorithms

# Code of Conduct

Code of conduct can be found [here](https://github.com/att/qujata/blob/main/CODE_OF_CONDUCT.md)

# License

License can be found [here](https://github.com/att/qujata/blob/main/LICENSE.md).
