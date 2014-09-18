beaver-evolution
================

How to set up with OpenShift
===
1. Put your ssh public key on Openshift
2. ```cd``` into this repo, then run: 
```
git remote add openshift ssh://541a4fec5973cad3c4000011@6073-beaverevolution.rhcloud.com/~/git/6073.git/
```
3. To push/pull to Openshift: 
```
git push openshift master
git pull openshift master
```
