import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import basedUrl from "@/features/api/basedUrl";

const Message = ({ user }) => {
  const { userId } = useParams(); // ✅ Corrected destructuring
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const baseUrl = basedUrl();
  const handleSend = async () => {
    if (!recipient || !subject || !body) {
      toast.error("Please fill all fields.");
      return;
    }
    // Validate email format for recipient
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(recipient)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/v1/messages/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          subject,
          body,
          recipient,
          // Assuming you have sender from logged-in user
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      toast.success("Message sent successfully!");
      // console.log(data);

      // Reset form
      setRecipient("");
      setSubject("");
      setBody("");
    } catch (error) {
      toast.error("Error sending message");
      console.error("Send message error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 my-20 mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Send a Message to Community</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Compose and send a message to a community.
      </p>

      <div>
        <Label htmlFor="recipient">To</Label>
        <Input
          id="recipient"
          type="email"
          placeholder="Recipient email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="dark:border-gray-600"
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Message subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="dark:border-gray-600"
        />
      </div>

      <div>
        <Label htmlFor="body">Message</Label>
        <Textarea
          id="body"
          placeholder="Write your message here..."
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="dark:border-gray-600"
        />
      </div>

      <Button onClick={handleSend}>Send Message</Button>
    </div>
  );
};

export default Message;
