using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

//THIS IS A USELESS SCRIPT MADE FOR TESTING THE 1ST BUILD
public class EndlessCameraRotation : MonoBehaviour
{
    void Update()
    {
        var rotationValue = new Vector3(0, 0, 3); //rotation in z axis
        this.GameObject().transform.Rotate(rotationValue * Time.deltaTime);
    }
}
